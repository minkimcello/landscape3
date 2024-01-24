import React from 'react';
import { CategoryStats } from 'cncf-common';

export const Members = ({stats}: {
  stats: CategoryStats,
}) => {
  return (
    <>
      Members count: {stats.count}
    </>
  )
}
