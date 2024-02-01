import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  TableContainer,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons'
import { CategoryStats } from 'cncf-common';

export const Projects = ({stats}: {
  stats: CategoryStats,
}) => {
  const { subcategoryBreakdown, categoryBreakdown } = stats;
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>
        By Category
      </Typography>
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
    </div>
  );
};
