import fs from 'fs';
import { readLandscapeData } from './utils';

fs.writeFileSync('./output/generated_landscape.json', JSON.stringify(readLandscapeData(), null, 2))
