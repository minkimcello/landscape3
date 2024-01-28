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
  
  const {
    summary: cncfProjectsSummary,
    uniqueKeysAnalysis: cncfProjectsKeysAnalysis,
  }  = calculateStats(cncfProjects);
  const {
    summary: cncfSpecialSummary,
    uniqueKeysAnalysis: cncfSpecialKeysAnalysis,
  }  = calculateStats(cncfSpecial);
  const {
    summary: cncfMembersSummary,
    uniqueKeysAnalysis: cncfMembersKeysAnalysis,
  }  = calculateStats(cncfMembers);
  const {
    summary: cncfWasmSummary,
    uniqueKeysAnalysis: cncfWasmKeysAnalysis,
  }  = calculateStats(cncfWasm);
  const {
    summary: nonCncfProjectsSummary,
    uniqueKeysAnalysis: nonCncfProjectsKeysAnalysis,
  }  = calculateStats(nonCncfProjects);

  return {
    summary: {
      cncfProjectsSummary,
      cncfSpecialSummary,
      cncfMembersSummary,
      cncfWasmSummary,
      nonCncfProjectsSummary,
      duplicateNames,
      notes: [
        ...cncfProjectsExceptions.map(exception => exception.description),
      ],
    },
    analysis: {
      cncfProjectsKeysAnalysis,
      cncfSpecialKeysAnalysis,
      cncfMembersKeysAnalysis,
      cncfWasmKeysAnalysis,
      nonCncfProjectsKeysAnalysis
    }
  };
}

function writeStats() {
  const { summary, analysis } = getStats();
  fs.writeFileSync(`${process.cwd()}/generated/landscape_stats.json`, JSON.stringify(summary, null, 2));
  fs.writeFileSync(`${process.cwd()}/generated/landscape_stats_analysis.json`, JSON.stringify(analysis, null, 2));
}

writeStats();
