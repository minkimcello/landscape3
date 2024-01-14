import React from 'react';
import { useAsync } from 'react-use';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

export const Members = () => {
  const config = useApi(configApiRef);
  const backend = config.getString('backend.baseUrl');

  const { value } = useAsync(async () => {
    try {
      const stats = await fetch(`${backend}/api/cncf-stats/stats`)
        .then(response => response.json());
      return stats.cncfMembersSummary;
    } catch(e) {
      let error;
      if (e instanceof Error) {
        error = new Error(e.message);
      }
      throw error;
    }
  });

  return (
    <>
      members count: {value.count}
    </>
  );
}
