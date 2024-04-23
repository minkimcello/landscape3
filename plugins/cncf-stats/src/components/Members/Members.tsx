import React from 'react';
import { CategoryStats } from 'cncf-common';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { StyledPieChart } from '../Charts/StyledPieChart';
import CardHeader from '@mui/material/CardHeader';

const Chart = ({ stats }: {
  stats: CategoryStats,
}) => {
  return (
    <Card>
      <CardHeader title="By Status" />
      <StyledPieChart stats={stats.subcategoryBreakdown["CNCF Members"]} count={stats.count} />
    </Card>
  );
}

export const Members = ({ stats }: {
  stats: CategoryStats,
}) => (
  <Grid container>
    <Grid item> <Chart stats={stats}/> </Grid>
  </Grid>
);
