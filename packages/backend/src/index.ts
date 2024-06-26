import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));
backend.add(import('@backstage/plugin-catalog-backend/alpha'));

backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));
backend.add(import('@backstage/plugin-search-backend/alpha'));

backend.add(import('backstage-plugin-cncf-stats-backend'));

backend.start();
