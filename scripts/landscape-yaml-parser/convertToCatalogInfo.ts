import { stringify } from 'yaml';
import { readLandscapeData } from './utils/readLandscapeData';
import { SubCategory, Item } from './types';

const fs = require('fs');

const CATALOG_INFO_COUNT = 1;
const OUTPUT_DIR = './generated';

interface ItemWithCategory extends Item {
  category: string;
  subcategory: string;
}

const first_seven_categories = readLandscapeData().landscape.slice(0,7).reduce((acc, item) => {
  return [...acc, {
    category: item.name,
    subcategories: item.subcategories,
  }];
}, [] as {
  category: string,
  subcategories: SubCategory[],
}[]);

const products_combined = first_seven_categories.reduce((acc, item) => {
  const category = item.category;
  const subcategoriesItems = item.subcategories.reduce((acc1, item1) => {
    return [...acc1, ...item1.items.map(x => {
      return {
        ...x,
        subcategory: item1.name,
        category,
      }
    })];
  }, [] as ItemWithCategory[]);
  return [...acc, ...subcategoriesItems];
}, [] as ItemWithCategory[]);

const example_catalog_infos = products_combined.slice(0,CATALOG_INFO_COUNT);

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

example_catalog_infos.forEach(product => {
  const { name, description, homepage_url } = product;

  const spec = {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Component",
    metadata: {
      name,
      description,
      links: [
        {
          url: homepage_url,
        }
      ],
    },
    spec: {
      type: "service",
      lifecycle: "experimental",
      owner: "hello",
    }
  }
  fs.writeFileSync(`${OUTPUT_DIR}/${name.toLowerCase().replace(/\ /g, '_')}.yaml`, stringify(spec));
});
