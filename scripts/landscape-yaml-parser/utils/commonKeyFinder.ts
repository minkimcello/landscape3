import type { LandscapeItem } from '../types';

function getKeys(obj: { [key: string]: any }) {
  // WIP: using `[key: string]: any` instead of `Item` as a workaround for
  // the error "Expression of type string can't be used to index type"
  let keys: string[] = [];
  for (const key in obj) {
    if (key) {
      keys.push(key);
      if (typeof obj[key] === "object") {
        const subkeys = getKeys(obj[key]);
        keys = keys.concat(
          subkeys.map((subkey) => {
            return `${key}.${subkey}`;
          })
        );
      }
    }
  }
  return keys;
}

const listOfUniqueKeys = (items: LandscapeItem[]) => {
  return items.reduce((acc, item) => {  
    const listOfKeys = getKeys(item);
    const newKey = listOfKeys.filter(key => {
      return !acc.includes(key);
    });
    return [...acc, ...newKey];
  }, [] as string[]);
}

interface KeysReport {
  uniqueKeys: string,
  commonKeys: string[]
}

export const commonKeyFinder = (items: LandscapeItem[]): KeysReport => {
  const keys: string[] = listOfUniqueKeys(items);
  
  const commonKeys = keys.reduce((acc, key) => {
    let doesNotExistInAllItems = false;
    for (const item of items) {
      const itemKeys = listOfUniqueKeys([item]);
      if (!itemKeys.includes(key)) {
        doesNotExistInAllItems = true;
        break;
      }
    }
    if (doesNotExistInAllItems) {
      return acc;
    }
    return [...acc, key];
  }, [] as string[]);

  const uniqueKeys = keys.filter(key => {
    return !commonKeys.includes(key);
  });

  return {
    uniqueKeys: uniqueKeys.sort().join(','),
    commonKeys, 
  };
}
