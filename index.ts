import { getMetadataSummary } from "./src/getMetadataSummary";
import { Item } from './src/types';

const cncfProjects = getMetadataSummary((items: Item[]) => {
  // there are two projects that do not have extra.accepted specified
  return items.filter((item: Item) => item.project).filter((item: Item) => item.extra);
});

console.log(cncfProjects);
