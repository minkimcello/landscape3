import { getMetadataSummary } from "./src/getMetadataSummary.js";

const cncfProjects = getMetadataSummary(items => {
  // there are two projects that do not have extra.accepted specified
  return items.filter(item => item.project).filter(item => item.extra);
});

console.log(cncfProjects);
