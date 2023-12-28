import { parse } from 'yaml';
import {
  Landscape,
  Category,
  LandscapeItem,
} from '../types';

async function readLandscapeData(): Promise<Landscape> {
  const response = await fetch('https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml');
  if (!response.ok) {
    throw new Error('Failed to fetch landscape data');
  }
  const landscapeFile = await response.text();
  const landscapeData: Landscape  = parse(landscapeFile);

  return landscapeData;
}

function getItemsFromSubCategory({ item, category }: {
  item: Category;
  category: string;
}) {
  return item.subcategories.reduce((acc, subcategory) => {
    return [...acc, ...subcategory.items.map(item => {
      return {
        ...item,
        subcategory: item.name,
        category,
      };
    })];
  }, [] as LandscapeItem[]);
}

export async function getAllLandscapeItems(): Promise<LandscapeItem[]> {
  const landscapeData = await readLandscapeData();
  const { landscape } = landscapeData;
  
  const allItems = landscape.reduce((acc, item) => {
    const subcategoriesItems = getItemsFromSubCategory({ item, category: item.name });
    return [...acc, ...subcategoriesItems];
  }, [] as LandscapeItem[]);

  return allItems;
}
