import { parse } from 'yaml';
import fs from 'fs';

export function readLandscapeData() {
  const landscapeFile = fs.readFileSync('landscape.yml', 'utf8');
  const landscape = parse(landscapeFile);
  return landscape.landscape;
}
