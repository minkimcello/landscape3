import { parse } from 'yaml';
import fs from 'fs';
import { Landscape } from './types';

function readLandscapeData() {
  const landscapeFile = fs.readFileSync('landscape.yml', 'utf8');
  const landscape: Landscape = parse(landscapeFile);
  return landscape;
}

fs.writeFileSync('./output/generated_landscape.json', JSON.stringify(readLandscapeData(), null, 2))
