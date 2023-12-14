import { parse } from 'yaml';
import { Landscape } from '../types';

const fs = require('fs');

export function readLandscapeData(): Landscape {
  const landscapeFile = fs.readFileSync('./scripts/landscape-yaml-parser/landscape.yml', 'utf8');
  return parse(landscapeFile);
}
