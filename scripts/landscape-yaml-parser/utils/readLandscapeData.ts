import { parse } from 'yaml';
import { Landscape } from '../types';

export async function readLandscapeData(): Promise<Landscape> {
  const response = await fetch('https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml');
  if (!response.ok) {
    throw new Error('Failed to fetch landscape data');
  }
  const landscapeFile = await response.text();
  return parse(landscapeFile);
}
