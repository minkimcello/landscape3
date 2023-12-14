import fs from 'fs';
import { readLandscapeData } from './utils/readLandscapeData';

fs.writeFileSync('./generated/landscape.json', JSON.stringify(readLandscapeData(), null, 2))
