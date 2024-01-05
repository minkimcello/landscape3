import { parse } from 'yaml';
import { Landscape } from './types';

const fs = require('fs');

async function fetchLandscapeData(): Promise<Landscape> {
  const response = await fetch('https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml');
  if (!response.ok) {
    throw new Error('Failed to fetch landscape data');
  }
  const landscapeFile = await response.text();
  const landscapeData: Landscape  = parse(landscapeFile);

  return landscapeData;
}

async function main() {
  const landscapeData = await fetchLandscapeData();
  fs.writeFileSync('./generated/landscape.json', JSON.stringify(landscapeData, null, 2));
}

main();
