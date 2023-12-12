import { parse } from 'yaml';
import fs from 'fs';
import { Category, Landscape } from '../types';

export function readLandscapeData(): Category[] {
  const landscapeFile = fs.readFileSync('landscape.yml', 'utf8');
  const landscape: Landscape = parse(landscapeFile);
  return landscape.landscape;
}
