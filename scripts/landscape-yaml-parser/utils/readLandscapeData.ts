import {
  Landscape,
  Category,
  LandscapeItem,
} from 'cncf-common';

const fs = require('fs');

function readLandscapeData(): Landscape {
  const landscapePath = `${process.cwd()}/generated/landscape.json`;
  const landscape = fs.readFileSync(landscapePath);
  return JSON.parse(landscape);
}

function getItemsFromSubCategory({ category, categoryName }: {
  category: Category;
  categoryName: string;
}) {
  return category.subcategories.reduce((acc, subcategory) => {
    return [...acc, ...subcategory.items.map(item => {
      return {
        ...item,
        subcategory: subcategory.name,
        category: categoryName,
      };
    })];
  }, [] as LandscapeItem[]);
}

export function getAllLandscapeItems(): LandscapeItem[] {
  const landscapeData: Landscape = readLandscapeData();
  const { landscape } = landscapeData;
  
  const allItems = landscape.reduce((acc, item) => {
    const subcategoriesItems = getItemsFromSubCategory({ category: item, categoryName: item.name });
    return [...acc, ...subcategoriesItems];
  }, [] as LandscapeItem[]);

  return allItems;
}
