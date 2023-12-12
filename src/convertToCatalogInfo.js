import { stringify } from 'yaml';
import fs from 'fs';
import { readLandscapeData } from './utils/readLandscapeData';

const CATALOG_INFO_COUNT = 20;

const products_combined = readLandscapeData().slice(0,7).reduce((acc, item) => {
  return [...acc, {
    category: item.name,
    subcategories: item.subcategories,
  }];
}, []).reduce((acc, item) => {
  const category = item.category;
  const subcategoriesItems = item.subcategories.reduce((acc, item) => {
    return [...acc, ...item.items.map(x => {
      return {
        ...x,
        subcategory: item.name,
        category,
      }
    })];
  }, []);
  return [...acc, ...subcategoriesItems];
}, []);

const example_catalog_infos = products_combined.slice(0,CATALOG_INFO_COUNT);

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
  fs.writeFileSync(`./notes/catalog_info_examples/${name.toLowerCase().replace(/\ /g, '_')}.yaml`, stringify(spec));
});
