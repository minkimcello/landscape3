import { commonKeyFinder } from './commonKeyFinder';
import {
  CategoryStats,
  LandscapeItem,
  StatsCategoryBreakdown,
  StatsSubcategoryBreakdown,
} from 'cncf-common';

export const calculateStats = (items: LandscapeItem[]): CategoryStats => {
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
