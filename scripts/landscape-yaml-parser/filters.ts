import { LandscapeItem } from "cncf-common";

interface FilterExceptions {
  landscapeItems: LandscapeItem[];
  description: string;
}

export interface FilterWithExceptions {
  landscapeItems: LandscapeItem[];
  exceptions: FilterExceptions[];
}

export function filterProjects(landscapeItems: LandscapeItem[]): FilterWithExceptions {
  const cncfProjectsWithoutExtra: LandscapeItem[] = [];
  const cncfProjects = landscapeItems.filter((item: LandscapeItem) => item.project)
    .filter((item: LandscapeItem) => {
      if (!item.extra) {
        cncfProjectsWithoutExtra.push(item);
      }
      return item.extra;
    });
  return {
    landscapeItems: cncfProjects,
    exceptions: [
      {
        landscapeItems: cncfProjectsWithoutExtra,
        description: `The following projects do not have 'extra.accepted' specified: ${cncfProjectsWithoutExtra.map(project => project.name).join(', ')}`,
      }
    ],
  }
}

export function filterSpecials(landscapeItems: LandscapeItem[]): LandscapeItem[] {
  return landscapeItems.filter((item: LandscapeItem) => {
    return item.category === "Special";
  });
}

export function filterMembers(landscapeItems: LandscapeItem[]): LandscapeItem[] {
  return landscapeItems.filter((item: LandscapeItem) => {
    return item.category === "CNCF Members";
  });
}

export function filterWasm(landscapeItems: LandscapeItem[]): LandscapeItem[] {
  return landscapeItems.filter((item: LandscapeItem) => {
    return item.category === "Wasm";
  });
}

interface FilterNonCncf {
  landscapeItems: LandscapeItem[];
  cncfWasm: LandscapeItem[];
  cncfMembers: LandscapeItem[];
  cncfSpecial: LandscapeItem[];
  cncfProjects: LandscapeItem[];
}

export function filterNonCncfProjects({
  landscapeItems,
  cncfWasm,
  cncfMembers,
  cncfSpecial,
  cncfProjects,
}: FilterNonCncf): LandscapeItem[] {
  const allCategoriesCombined = [...new Set([...cncfWasm, ...cncfMembers, ...cncfSpecial, ...cncfProjects])];

  return landscapeItems.filter(item => {
    return !allCategoriesCombined.includes(item);
  });
}
