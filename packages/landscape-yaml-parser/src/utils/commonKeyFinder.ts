import type { Item } from '../types';

function getKeys(obj: { [key: string]: any }) {
  // WIP: using `[key: string]: any` instead of `Item` as a workaround for
  // the error "Expression of type string can't be used to index type"
  let keys: string[] = [];
  for (const key in obj) {
    keys.push(key);
    if (typeof obj[key] == "object") {
      const subkeys = getKeys(obj[key]);
      keys = keys.concat(
        subkeys.map((subkey) => {
          return `${key}.${subkey}`;
        })
      );
    }
  }
  return keys;
}

const listOfKeys = (items: Item[]) => {
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

export const commonKeyFinder = (items: Item[]): KeysReport => {
  const keys: string[] = listOfKeys(items);
  
  const commonKeys = keys.reduce((acc, key) => {
    let doesNotExistInAllItems = false;
    for (let item of items) {
      const itemKeys = listOfKeys([item]);
      if (!itemKeys.includes(key)) {
        doesNotExistInAllItems = true;
        break;
      }
    }
    if (doesNotExistInAllItems) {
      return acc;
    } else {
      return [...acc, key];
    }
  }, [] as string[]);

  const uniqueKeys = keys.filter(key => {
    return !commonKeys.includes(key);
  });

  return {
    uniqueKeys: uniqueKeys.sort().join(','),
    commonKeys, 
  };
}
