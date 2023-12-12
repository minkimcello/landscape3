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

export const commonKeyFinder = (items) => {
  const keys = listOfKeys(items);
  
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
  }, []);

  const uniqueKeys = keys.filter(key => {
    return !commonKeys.includes(key);
  });

  return {
    uniqueKeys: uniqueKeys.sort().join(','),
    commonKeys, 
  };
}
