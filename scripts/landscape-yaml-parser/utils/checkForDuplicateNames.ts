import { LandscapeItem } from "cncf-common";

interface DuplicateNamesReport {
  unique: string[];
  duplicates: string[];
}

const findDuplicateNames = (items: string[]): DuplicateNamesReport => {
  return items.reduce((acc, item) => {
    const alreadyExists = acc.unique.includes(item);
    return {
      unique: alreadyExists ? acc.unique : [...acc.unique, item],
      duplicates: alreadyExists ? [...acc.duplicates, item] : acc.duplicates,
    }
  }, {
    unique: [],
    duplicates: [],
  } as DuplicateNamesReport);
}

export const checkForDuplicateNames = (items: LandscapeItem[]): string => {
  const { duplicates } = findDuplicateNames(items.map(item => item.name));
  return duplicates.join(' ,');
};
