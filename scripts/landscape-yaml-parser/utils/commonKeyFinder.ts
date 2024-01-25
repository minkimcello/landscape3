import { LandscapeItem } from 'cncf-common';

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

export interface UniqueKeyStats {
  key: string;
  count: number;
  percentage: string;
  included: string;
  excluded: string;
}

interface KeysReport {
  uniqueKeys: string,
  commonKeys: string[],
  uniqueKeysAnalysis: UniqueKeyStats[];
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

  const uniqueKeysAnalysis = uniqueKeys.map(key => {
    return items.reduce((acc, item) => {
      const itemKeys = listOfUniqueKeys([item]);
      if (itemKeys.includes(key)) {
        return {
          key,
          count: acc.count + 1,
          included: [...acc.included, item.name],
          excluded: acc.excluded,
        };
      }
      return {
        key,
        count: acc.count,
        included: acc.included,
        excluded: [...acc.excluded, item.name],
      };
    }, {
      key,
      count: 0,
      included: [] as string[],
      excluded: [] as string[],
    });
  });

  const uniqueKeysAnalysisWithPercentages = uniqueKeysAnalysis.map(analysis => {
    const {
      key, count, included, excluded
    } = analysis;
    const percentage = `${((count * 100) / items.length).toFixed(1)}%`;
    return {
      key,
      count,
      percentage,
      included: included.join(', '),
      excluded: excluded.join(', '),
    };
  });

  return {
    uniqueKeys: uniqueKeys.sort().join(','),
    commonKeys,
    uniqueKeysAnalysis: uniqueKeysAnalysisWithPercentages.sort((a, b) => b.count - a.count),
  };
}
