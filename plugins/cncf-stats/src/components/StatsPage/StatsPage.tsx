import React from 'react';
import { StatsLayout } from '../StatsLayout';
import { Members } from '../Members';
import { Projects } from '../Projects';

export const StatsPage = () => {
  return (
    <StatsLayout>
      <StatsLayout.Route path="projects" title="Projects">
        <Projects />
      </StatsLayout.Route>
      <StatsLayout.Route path="members" title="Members">
        <Members />
      </StatsLayout.Route>
    </StatsLayout>
  );
};
