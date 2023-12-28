import { checkForDuplicateNames } from './utils/checkForDuplicateNames';
import { getAllLandscapeItems } from './utils/readLandscapeData';
import { commonKeyFinder } from './utils/commonKeyFinder';
import { LandscapeItem } from './types';

const fs = require('fs');

interface Breakdown {
  [key:string]: number;
}

export interface CategoryStats {
  count: number;
  commonKeys: string[];
  categoryBreakdown: Breakdown;
  subcategoryBreakdown: Breakdown;
}

const generateStats = (items: LandscapeItem[]): CategoryStats => {
  const { commonKeys } = commonKeyFinder(items);

  const categoryBreakdown = items.reduce((acc, item) => {
    if (acc.hasOwnProperty(item.category)) {
      acc[item.category] = acc[item.category] + 1;
    } else {
      acc[item.category] = 1;
    }
    return acc;
  }, {} as Breakdown);

  const subcategoryBreakdown = items.reduce((acc, item) => {
    if (acc.hasOwnProperty(item.subcategory)) {
      acc[item.subcategory] = acc[item.subcategory] + 1;
    } else {
      acc[item.subcategory] = 1;
    }
    return acc;
  }, {} as Breakdown);

  return {
    count: items.length,
    commonKeys,
    categoryBreakdown,
    subcategoryBreakdown,
  };
}

function getStats() {
  const allLandscapeItems: LandscapeItem[] = getAllLandscapeItems();
  const duplicateNames = checkForDuplicateNames(allLandscapeItems) || false;

  const cncfProjectsWithMissingInformation: LandscapeItem[] = [];
  const cncfProjects = allLandscapeItems.filter((item: LandscapeItem) => item.project)
    .filter((item: LandscapeItem) => {
      if (!item.extra) {
        cncfProjectsWithMissingInformation.push(item);
      }
      return item.extra;
    });
  const cncfSpecial = allLandscapeItems.filter((item: LandscapeItem) => item.category === "Special");
  const cncfMembers =allLandscapeItems.filter((item: LandscapeItem) => item.category === "CNCF Members");
  const cncfWasm = allLandscapeItems.filter((item: LandscapeItem) => item.category === "Wasm");
  const nonCncfProjects = allLandscapeItems.filter(item => {
    return ![...new Set([...cncfWasm, ...cncfMembers, ...cncfSpecial, ...cncfProjects])].includes(item);
  });
  
  const cncfProjectsSummary = generateStats(cncfProjects);
  const cncfSpecialSummary = generateStats(cncfSpecial);
  const cncfMembersSummary = generateStats(cncfMembers);
  const cncfWasmSummary = generateStats(cncfWasm);
  const nonCncfProjectsSummary = generateStats(nonCncfProjects);
  
  const tally = allLandscapeItems.length
    + cncfProjectsWithMissingInformation.length
    - cncfProjects.length
    - cncfSpecial.length
    - cncfMembers.length
    - cncfWasm.length
    - nonCncfProjects.length;

  if (tally) {
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
      `The following projects that do not have 'extra.accepted' specified: ${cncfProjectsWithMissingInformation.map(project => project.name).join(', ')}`
    ],
  };
}

function writeStats() {
  const summary = getStats();
  fs.writeFileSync(`${process.cwd()}/generated/landscape_stats.json`, JSON.stringify(summary, null, 2));
}

writeStats();
