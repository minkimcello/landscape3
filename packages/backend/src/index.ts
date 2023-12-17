//   apiRouter.use('/auth', await auth(authEnv));

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

  backend.add(import('@backstage/plugin-adr-backend'));
backend.add(import('@backstage/plugin-app-backend/alpha'));
  backend.add(import('@backstage/plugin-azure-devops-backend'));
  backend.add(import('@backstage/plugin-badges-backend'));
//   apiRouter.use('/catalog', await catalog(catalogEnv));
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));
  backend.add(
    import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
  );
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
  backend.add(import('@backstage/plugin-devtools-backend'));
  backend.add(import('@backstage/plugin-entity-feedback-backend'));
  backend.add(import('@backstage/plugin-jenkins-backend'));
  backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));
  backend.add(import('@backstage/plugin-lighthouse-backend'));
  backend.add(import('@backstage/plugin-linguist-backend'));
  backend.add(import('@backstage/plugin-playlist-backend'));
  backend.add(import('@backstage/plugin-nomad-backend'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);
backend.add(import('@backstage/plugin-permission-backend/alpha'));
//   apiRouter.use('/proxy', await proxy(proxyEnv));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
//   apiRouter.use('/scaffolder', await scaffolder(scaffolderEnv));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
//   apiRouter.use('/search', await search(searchEnv));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
  backend.add(import('@backstage/plugin-search-backend-module-explore/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));
  backend.add(
    import('@backstage/plugin-catalog-backend-module-backstage-openapi'),
  );
backend.add(import('@backstage/plugin-search-backend/alpha'));
//   apiRouter.use('/techdocs', await techdocs(techdocsEnv));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
  backend.add(import('@backstage/plugin-todo-backend'));
  backend.add(import('@backstage/plugin-sonarqube-backend'));

backend.start();
