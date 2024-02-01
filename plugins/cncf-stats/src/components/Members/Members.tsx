import React from 'react';
import { CategoryStats } from 'cncf-common';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks'
import { styled } from '@material-ui/core';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 'bold',
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export const Members = ({stats}: {
  stats: CategoryStats,
}) => {
  const data = Object.entries(stats.subcategoryBreakdown["CNCF Members"]).map(
    ([label, value]) => ({ label, value }));
  return (
    <PieChart series={[{ data, innerRadius: 160 }]} width={800} height={400}>
      <PieCenterLabel>Total: {stats.count}</PieCenterLabel>
    </PieChart>
  );
}
