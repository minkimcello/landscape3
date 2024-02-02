import React from 'react';
import { CategoryStats } from 'cncf-common';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks'
import { blueberryTwilightPaletteLight } from '@mui/x-charts/colorPalettes';
import { 
  styled, 
  Grid, 
  Card, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody, 
} from '@material-ui/core';

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

const Chart = ({stats}: {
  stats: CategoryStats,
}) => {
  const data = Object.entries(stats.subcategoryBreakdown["CNCF Members"]).map(
    ([label, value]) => ({ label, value }));
  return (
    <Card>
      <Grid container alignItems='center' style={{padding: '16px'}}>
        <Grid item>
          <PieChart 
            series={[{ data, innerRadius: 120 }]} 
            width={400} 
            height={400}
            slotProps={{legend: {hidden: true}}}
            colors={blueberryTwilightPaletteLight}
          >
            <PieCenterLabel>Total: {stats.count}</PieCenterLabel>
          </PieChart>
        </Grid>
        <Grid item>
          <Table>
            <TableBody>
              {data.map(({label, value}, index) => (
                <TableRow>
                  <TableCell style={{ backgroundColor: blueberryTwilightPaletteLight[index]}}></TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}> {label} </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}> {value} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  );
}

export const Members = ({stats}: {
  stats: CategoryStats,
}) => {
  console.log(blueberryTwilightPaletteLight);
  return (
    <Grid container>
      <Grid item> { Chart({stats}) } </Grid>
    </Grid>
  )
};