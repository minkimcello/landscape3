import fs from 'fs';
import { readLandscapeData } from './utils/readLandscapeData';

async function main() {
  const landscapeData = await readLandscapeData();
  fs.writeFileSync('./generated/landscape.json', JSON.stringify(landscapeData, null, 2))
}

main();
