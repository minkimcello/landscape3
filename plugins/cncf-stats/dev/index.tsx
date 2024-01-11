import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { cncfStatsPlugin, CncfStatsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(cncfStatsPlugin)
  .addPage({
    element: <CncfStatsPage />,
    title: 'Root Page',
    path: '/cncf-stats'
  })
  .render();
