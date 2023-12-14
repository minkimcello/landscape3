import { readLandscapeData } from './utils/readLandscapeData';

const fs = require('fs');

fs.writeFileSync('./generated/landscape.json', JSON.stringify(readLandscapeData(), null, 2))
