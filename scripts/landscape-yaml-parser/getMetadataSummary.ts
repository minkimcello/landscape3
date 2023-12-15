import { checkForDuplicateNames } from './utils/checkForDuplicateNames';
import { readLandscapeData } from './utils/readLandscapeData';
import { commonKeyFinder } from './utils/commonKeyFinder';

import { Item, SubCategory } from './types';

export interface MetadataSummary {
  duplicateNames: string;
  cncfProjectsKeys: {
    uniqueKeys: string;
    commonKeys: string[];
  };
}

export const getMetadataSummary = async (filter: (items: Item[]) => Item[]): Promise<MetadataSummary> => {
  const landscapeData = await readLandscapeData();
  const allItems = landscapeData.landscape.reduce((acc, item) => {
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

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
(async () => {
  const cncfProjects = await getMetadataSummary((items: Item[]) => {
    // there are two projects that do not have extra.accepted specified
    return items.filter((item: Item) => item.project).filter((item: Item) => item.extra);
  });
  
  console.log(cncfProjects);
})();
