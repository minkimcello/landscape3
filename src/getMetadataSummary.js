import { checkForDuplicateNames } from './utils/checkForDuplicateNames.js';
import { commonKeyFinder } from './utils/commonKeyFinder.js'
import { readLandscapeData } from './utils/readLandscapeData.js'

export const getMetadataSummary = (filter) => {
  const allItems = readLandscapeData().reduce((acc, item) => {
    return [...acc, ...item.subcategories];
  }, []).reduce((acc, item) => {
    return [...acc, ...item.items];
  }, []);
  const filteredItems = filter(allItems); 

  const duplicateNames = checkForDuplicateNames(filteredItems) || "All names are unique";
  const cncfProjectsKeys = commonKeyFinder(filteredItems);

  return {
    duplicateNames,
    cncfProjectsKeys,  
  }  
}
