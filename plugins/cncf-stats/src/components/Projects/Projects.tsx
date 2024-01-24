import React from 'react';
import { CategoryStats } from 'cncf-common';

export const Projects = ({stats}: {
  stats: CategoryStats,
}) => {
  return (
    <>
      Projects count: {stats.count} 
    </>
  )
}
