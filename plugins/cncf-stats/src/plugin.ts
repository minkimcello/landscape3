import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const cncfStatsPlugin = createPlugin({
  id: 'cncf-stats',
  routes: {
    root: rootRouteRef,
  },
});

export const CncfStatsPage = cncfStatsPlugin.provide(
  createRoutableExtension({
    name: 'CncfStatsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
