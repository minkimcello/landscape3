import { loggerToWinstonLogger } from '@backstage/backend-common';
import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

export const cncfStatsPlugin = createBackendPlugin({
  pluginId: 'cncf-stats',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        http: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ logger, http, config }) {
        const winstonLogger = loggerToWinstonLogger(logger);
        http.use(await createRouter({
          logger: winstonLogger,
          config,
        }));
      },
    });
  },
});
