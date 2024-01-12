import React from 'react';
import { StatsLayout } from '../StatsLayout';

export const StatsPage = () => {
  return (
    <StatsLayout>
      <StatsLayout.Route path="projects" title="Projects">
        <>projects</>
      </StatsLayout.Route>
      <StatsLayout.Route path="members" title="Members">
        <>members</>
      </StatsLayout.Route>
    </StatsLayout>
  );
};
