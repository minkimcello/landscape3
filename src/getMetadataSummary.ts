import {
  checkForDuplicateNames,
  commonKeyFinder,
  readLandscapeData,
} from './utils';

import { Item, SubCategory } from './types';

export interface MetadataSummary {
  duplicateNames: string;
  cncfProjectsKeys: {
    uniqueKeys: string;
    commonKeys: string[];
  };
}

export const getMetadataSummary = (filter: (items: Item[]) => Item[]): MetadataSummary => {
  const allItems = readLandscapeData().reduce((acc, item) => {
    return [...acc, ...item.subcategories];
  }, [] as SubCategory[]).reduce((acc, item) => {
    return [...acc, ...item.items];
  }, [] as Item[]);
  const filteredItems = filter(allItems); 

  const duplicateNames = checkForDuplicateNames(filteredItems) || "All names are unique";
  const cncfProjectsKeys = commonKeyFinder(filteredItems);

  return {
    duplicateNames,
    cncfProjectsKeys,
  };
}
