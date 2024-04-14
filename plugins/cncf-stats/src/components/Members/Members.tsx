import React from 'react';
import { CategoryStats } from 'cncf-common';
import { Grid, Card } from '@mui/material';
import { StyledPieChart } from '../Utils/charts';

const Chart = ({stats}: {
  stats: CategoryStats,
}) => {
  return (
    <Card>
      <StyledPieChart stats={stats.subcategoryBreakdown["CNCF Members"]} count={stats.count} />
    </Card>
  );
}

export const Members = ({stats}: {
  stats: CategoryStats,
}) => {
  return (
    <Grid container>
      <Grid item> <Chart stats={stats}/> </Grid>
    </Grid>
  )
};
