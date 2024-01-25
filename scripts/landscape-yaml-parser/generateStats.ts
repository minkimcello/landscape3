import { checkForDuplicateNames } from './utils/checkForDuplicateNames';
import { getAllLandscapeItems } from './utils/readLandscapeData';
import { commonKeyFinder } from './utils/commonKeyFinder';
import {
  FilterWithExceptions,
  filterMembers,
  filterNonCncfProjects,
  filterProjects,
  filterSpecials,
  filterWasm,
} from './filters';
import {
  CategoryStats,
  LandscapeItem,
  StatsCategoryBreakdown,
  StatsSubcategoryBreakdown,
} from 'cncf-common';

const fs = require('fs');

const generateStats = (items: LandscapeItem[]): CategoryStats => {
  const { commonKeys, uniqueKeys } = commonKeyFinder(items);

  const categoryBreakdown = items.reduce((acc, item) => {
    if (acc.hasOwnProperty(item.category)) {
      acc[item.category] = acc[item.category] + 1;
    } else {
      acc[item.category] = 1;
    }
    return acc;
  }, {} as StatsCategoryBreakdown);

  const subcategoryBreakdown = items.reduce((acc, item) => {
    const parentCategory = item.category;
    const subcategory = item.subcategory;

    if (!acc.hasOwnProperty(parentCategory)) {
      acc[parentCategory] = {};
    }

    if (acc[parentCategory].hasOwnProperty(subcategory)) {
      acc[parentCategory][subcategory] += 1;
    } else {
      acc[parentCategory][subcategory] = 1;
    }
    return acc;
  }, {} as StatsSubcategoryBreakdown);

  return {
    count: items.length,
    commonKeys,
    uniqueKeys,
    categoryBreakdown,
    subcategoryBreakdown,
  };
}

function getStats() {
  const allLandscapeItems: LandscapeItem[] = getAllLandscapeItems();
  const duplicateNames = checkForDuplicateNames(allLandscapeItems) || false;

  const {
    landscapeItems: cncfProjects,
    exceptions: cncfProjectsExceptions,
  }: FilterWithExceptions = filterProjects(allLandscapeItems);
  const cncfSpecial = filterSpecials(allLandscapeItems);
  const cncfMembers = filterMembers(allLandscapeItems);
  const cncfWasm = filterWasm(allLandscapeItems);

  const nonCncfProjects = filterNonCncfProjects({
    landscapeItems: allLandscapeItems,
    cncfWasm,
    cncfMembers,
    cncfSpecial,
    cncfProjects,
  });
  
  const cncfProjectsSummary = generateStats(cncfProjects);
  const cncfSpecialSummary = generateStats(cncfSpecial);
  const cncfMembersSummary = generateStats(cncfMembers);
  const cncfWasmSummary = generateStats(cncfWasm);
  const nonCncfProjectsSummary = generateStats(nonCncfProjects);

  const cncfProjectExceptionsTally = cncfProjectsExceptions.reduce((acc, item) => {
    return item.landscapeItems.length + acc;
  }, 0);

  const total = cncfProjects.length
    + cncfSpecial.length
    + cncfMembers.length
    + cncfWasm.length
    + nonCncfProjects.length
    - cncfProjectExceptionsTally;
  
  if (total - allLandscapeItems.length) {
    console.log()
    console.log('cncfProjects', cncfProjects.length)
    console.log('cncfSpecial', cncfSpecial.length)
    console.log('cncfMembers', cncfMembers.length)
    console.log('cncfWasm', cncfWasm.length)
    console.log('nonCncfProjects', nonCncfProjects.length)
    console.log('cncfProjectsExceptions', cncfProjectExceptionsTally)
    console.log()
    console.log('  total: ', total)
    console.log('  allLandscapeItems', allLandscapeItems.length)
    console.log()
    throw new Error("The items count do not add up");
  }

  return {
    cncfProjectsSummary,
    cncfSpecialSummary,
    cncfMembersSummary,
    cncfWasmSummary,
    nonCncfProjectsSummary,
    duplicateNames,
    notes: [
      ...cncfProjectsExceptions.map(exception => exception.description),
    ],
  };
}

function writeStats() {
  const summary = getStats();
  fs.writeFileSync(`${process.cwd()}/generated/landscape_stats.json`, JSON.stringify(summary, null, 2));
}

writeStats();
