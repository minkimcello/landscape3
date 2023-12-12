const findDuplicateNames = (items) => {
  return items.reduce((acc, item) => {
    const alreadyExists = acc.unique.includes(item);
    return {
      unique: alreadyExists ? acc.unique : [...acc.unique, item],
      duplicates: alreadyExists ? [...acc.duplicates, item] : acc.duplicates,
    }
  }, {
    unique: [],
    duplicates: [],
  });
}

export const checkForDuplicateNames = (items) => {
  const { duplicates } = findDuplicateNames(items.map(item => item.name));
  return duplicates.join(' ,');
};
