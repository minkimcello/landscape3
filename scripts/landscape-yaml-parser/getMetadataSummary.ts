import { checkForDuplicateNames } from './utils/checkForDuplicateNames';
import { getAllLandscapeItems } from './utils/readLandscapeData';
import { commonKeyFinder } from './utils/commonKeyFinder';
import { LandscapeItem } from './types';

export interface MetadataSummary {
  duplicateNames: string;
  cncfProjectsKeys: {
    uniqueKeys: string;
    commonKeys: string[];
  };
}

export const getMetadataSummary = async (filter: (items: LandscapeItem[]) => LandscapeItem[]): Promise<MetadataSummary> => {
  const allLandscapeItems = await getAllLandscapeItems();
  const filteredItems = filter(allLandscapeItems); 

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
  const cncfProjects = await getMetadataSummary((items: LandscapeItem[]) => {
    // there are two projects that do not have extra.accepted specified
    return items.filter((item: LandscapeItem) => item.project).filter((item: LandscapeItem) => item.extra);
  });
  
  console.log(cncfProjects);
})();
