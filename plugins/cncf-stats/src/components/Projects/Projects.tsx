import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CategoryStats, StatsProjectMaturityBreakdown } from 'cncf-common';
import { StyledPieChart } from '../Utils/charts';

const ChartByCategory = ({stats}: {stats: CategoryStats}) => {
  const { subcategoryBreakdown, categoryBreakdown } = stats;
  return (
    <Card>
      <CardHeader title="By Category" />
      <CardContent>
        {Object.keys(subcategoryBreakdown).map((category) => (
          <Accordion key={category}>
            <AccordionSummary
              expandIcon={<ExpandMore/>}
              style={{fontSize:16, fontWeight:'bold'}}
            >
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>{category}</Grid>
                <Grid item>{categoryBreakdown[category]}</Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"#f0f0f0", fontSize:16, fontWeight:'bold'}}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {Object.entries(subcategoryBreakdown[category]).map(
                      ([subcategory, count]) => (
                        <TableRow key={subcategory}>
                          <TableCell style={{fontWeight: 'bold'}}>{subcategory}</TableCell>
                          <TableCell style={{fontWeight: 'bold'}}>{count}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
        <Grid container justifyContent='space-between' alignItems='center' style={{padding:'14px'}}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">{stats.count}</Typography>
        </Grid>
      </CardContent>
    </Card>
  )
};

const ChartByMaturity = ({stats, count}: {
  stats: StatsProjectMaturityBreakdown,
  count: number,
}) => {
  return (
    <Card>
      <CardHeader title="By Maturity" />
      <CardContent>
        <StyledPieChart stats={stats} count={count} />
      </CardContent>
    </Card>
  )
}

interface ProjectsProps {
  projectStats: CategoryStats;
  maturityStats: StatsProjectMaturityBreakdown;
}

export const Projects = ({ projectStats, maturityStats}: ProjectsProps) => {
  return (
    <Grid container>
      <Grid item> <ChartByMaturity stats={maturityStats} count={projectStats.count}/> </Grid>
      <Grid item> <ChartByCategory stats={projectStats}/> </Grid>
    </Grid>
  )
};
