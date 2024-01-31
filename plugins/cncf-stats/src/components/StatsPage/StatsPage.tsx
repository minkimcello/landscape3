import React from 'react';
import { useAsync } from 'react-use';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { StatsLayout } from '../StatsLayout';
import { Members } from '../Members';
import { Projects } from '../Projects';

export const StatsPage = () => {
  const config = useApi(configApiRef);
  const backend = config.getString('backend.baseUrl');

  const { value, loading, error } = useAsync(async () => {
    try {
      const stats = await fetch(`${backend}/api/cncf-stats/stats`)
        .then(response => response.json());
      return stats;
    } catch(e) {
      let err;
      if (e instanceof Error) {
        err = new Error(e.message);
      }
      throw err;
    }
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <StatsLayout>
      <StatsLayout.Route path="projects" title="Projects">
        <Projects stats={value.cncfProjectsSummary} />
      </StatsLayout.Route>
        <StatsLayout.Route path="members" title="Members">
      <Members stats={value.cncfMembersSummary} />
      </StatsLayout.Route>
    </StatsLayout>
  );
};
