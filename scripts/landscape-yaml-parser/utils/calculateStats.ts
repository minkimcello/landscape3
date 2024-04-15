import { commonKeyFinder, UniqueKeyStats } from './commonKeyFinder';
import {
  CategoryStats,
  LandscapeItem,
  StatsCategoryBreakdown,
  StatsSubcategoryBreakdown,
  StatsProjectMaturityBreakdown,
} from 'cncf-common';

export const calculateStats = (items: LandscapeItem[]): {
  summary: CategoryStats,
  uniqueKeysAnalysis: UniqueKeyStats[],
 } => {
  const { commonKeys, uniqueKeys, uniqueKeysAnalysis } = commonKeyFinder(items);

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
    summary: {
      count: items.length,
      commonKeys,
      uniqueKeys,
      categoryBreakdown,
      subcategoryBreakdown,
    },
    uniqueKeysAnalysis,
  };
}

export const calculateProjectMaturityStats = (items: LandscapeItem[]): StatsProjectMaturityBreakdown => {
  const projectMaturityBreakdown = items.reduce((acc, item) => {
    if (item.project) {
      if (acc.hasOwnProperty(item.project)) {
        acc[item.project] += 1;
      } else {
        acc[item.project] = 1;
      }
    }
    return acc;
  }, {} as StatsProjectMaturityBreakdown);
  return projectMaturityBreakdown;
}
