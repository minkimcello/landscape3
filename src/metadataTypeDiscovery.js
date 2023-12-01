import { parse } from 'yaml';
import fs from 'fs';

const landscapeFile = fs.readFileSync('landscape.yml', 'utf8');
const data = parse(landscapeFile);

const special = data.landscape[7].subcategories.reduce((acc, item) => {
  return [...acc, ...item.items]
}, []);
const members = data.landscape[8].subcategories.reduce((acc, item) => {
  return [...acc, ...item.items]
}, []);
const wasm = data.landscape[9].subcategories.reduce((acc, item) => {
  return [...acc, ...item.items]
}, []);
const products_combined = data.landscape.slice(0,7).reduce((acc, item) => {
  return [...acc, ...item.subcategories]
}, []).reduce((acc, item) => {
  return [...acc, ...item.items]
}, []);

function getKeys(obj) {
  let keys = [];
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

const listOfKeys = (items) => {
  return items.reduce((acc, item) => {  
    const listOfKeys = getKeys(item);
    const newKey = listOfKeys.filter(key => {
      return !acc.includes(key);
    });
    return [...acc, ...newKey];
  }, []);
}

const commonKeyFinder = (items) => {
  const keys = listOfKeys(items);
  
  const commonKeys = keys.reduce((acc, key) => {
    let doesNotExistInAllItems = false;
    for (let item of items) {
      if (!item.hasOwnProperty(key)) {
        doesNotExistInAllItems = true;
        break;
      }
    }
    if (doesNotExistInAllItems) {
      return acc;
    } else {
      return [...acc, key];
    }
  }, []);

  const uniqueKeys = keys.filter(key => {
    return !commonKeys.includes(key);
  });

  return {
    uniqueKeys: uniqueKeys.sort().join(','),
    commonKeys, 
  };
}

const products_combined_keys = commonKeyFinder(products_combined);
const special_keys = commonKeyFinder(special);
const members_keys = commonKeyFinder(members);
const wasm_keys = commonKeyFinder(wasm);

console.log(`
  ${products_combined_keys.uniqueKeys.length}
  ${special_keys.uniqueKeys.length}
  ${members_keys.uniqueKeys.length}
  ${wasm_keys.uniqueKeys.length}
`);
