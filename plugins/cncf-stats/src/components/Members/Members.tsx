import React from 'react';

export const Members = ({stats}: {
  stats: any,
}) => {
  return (
    <>
      Members count: {stats.count}
    </>
  )
}
