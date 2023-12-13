import { parse } from 'yaml';
import fs from 'fs';
import { Landscape } from '../types';

export function readLandscapeData(): Landscape {
  const landscapeFile = fs.readFileSync('landscape.yml', 'utf8');
  return parse(landscapeFile);
}
