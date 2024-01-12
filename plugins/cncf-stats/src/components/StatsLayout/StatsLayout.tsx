import React from 'react';
import {
  Header,
  Page,
  RoutedTabs,
} from '@backstage/core-components';
import {
  attachComponentData,
  useElementFilter,
} from '@backstage/core-plugin-api';

export type StatsLayoutProps = {
  children: React.ReactNode;
};

export type StatsLayoutRouteProps = {
  path: string;
  title: string;
  children: JSX.Element;
};

export const LAYOUT_DATA_KEY = 'plugin.cncf-stats.statsLayout';
export const LAYOUT_ROUTE_DATA_KEY = 'plugin.cncf-stats.statsLayoutRoute';

const Route: (props: StatsLayoutRouteProps) => null = () => null;
attachComponentData(Route, LAYOUT_ROUTE_DATA_KEY, true);

// This causes all mount points that are discovered within this route to use the path of the route itself
attachComponentData(Route, 'core.gatherMountPoints', true);

export const StatsLayout = (props: StatsLayoutProps) => {
  const { children } = props;
  const routes = useElementFilter(children, elements =>
    elements
      .selectByComponentData({
        key: LAYOUT_ROUTE_DATA_KEY,
        withStrictError:
          'Child of StatsLayout must be an StatsLayout.Route',
      })
      .getElements<StatsLayoutRouteProps>()
      .map(child => child.props),
  );

  return (
    <Page themeId="home">
      <Header title="Stats"/>
      <RoutedTabs routes={routes} />
    </Page>
  )
}

attachComponentData(StatsLayout, LAYOUT_DATA_KEY, true);

StatsLayout.Route = Route;
