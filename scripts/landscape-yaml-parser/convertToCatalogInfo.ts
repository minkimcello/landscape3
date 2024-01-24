import { stringify } from 'yaml';
import { LandscapeItem } from 'cncf-common';
import { getAllLandscapeItems } from './utils/readLandscapeData';
import { componentTemplate } from './catalog-templates';
import { filterProjects, FilterWithExceptions } from './filters';
import { Entity } from '@backstage/catalog-model';

const fs = require('fs');

const OUTPUT_DIR = `${process.cwd()}/generated/catalog`;

function removeCatalogInfos(dir: string) {
  if(fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir);
}

function createCatalogInfos({
  items,
  templateSpec,
  outputDir = OUTPUT_DIR,
}: {
  items: LandscapeItem[],
  templateSpec: (item: LandscapeItem) => Entity,
  outputDir?: string,
}): void {
  if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  items.forEach((item: LandscapeItem) => {
    const catalogInfo = templateSpec(item);
    fs.writeFileSync(
      `${outputDir}/${item.name.toLowerCase().replace(/\ /g, '_')}.yaml`,
      stringify(catalogInfo),
    );
  })
}

function convertToCatalogInfo(): void {
  removeCatalogInfos(OUTPUT_DIR);
  const allLandscapeItems = getAllLandscapeItems();

  // generates catalog infos for cncf projects
  const {
    landscapeItems: cncfProjects
  }: FilterWithExceptions = filterProjects(allLandscapeItems);
  createCatalogInfos({
    items: cncfProjects,
    templateSpec: componentTemplate,
    outputDir: `${OUTPUT_DIR}/projects`,
  });
}

convertToCatalogInfo();
