import { checkForDuplicateNames } from './utils/checkForDuplicateNames';
import { getAllLandscapeItems } from './utils/readLandscapeData';
import {
  FilterWithExceptions,
  filterMembers,
  filterNonCncfProjects,
  filterProjects,
  filterSpecials,
  filterWasm,
} from './filters';
import { LandscapeItem } from 'cncf-common';
import { calculateStats } from './utils/calculateStats';

const fs = require('fs');

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
  
  const cncfProjectsSummary = calculateStats(cncfProjects);
  const cncfSpecialSummary = calculateStats(cncfSpecial);
  const cncfMembersSummary = calculateStats(cncfMembers);
  const cncfWasmSummary = calculateStats(cncfWasm);
  const nonCncfProjectsSummary = calculateStats(nonCncfProjects);

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
