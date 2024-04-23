import React from 'react';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { PieChart } from '@mui/x-charts/PieChart';
import { blueberryTwilightPaletteLight } from '@mui/x-charts/colorPalettes';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 'bold',
}));

function PieCenterLabel({ children }: { children: React.ReactNode }): React.ReactElement {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function processPieChartData(data: { [key:string]: number }): { label:string; value:number}[] {
  return Object.entries(data).map(([label, value]) => ({ label, value }));
}

interface PieChartProps {
  stats: { [key:string]: number };
  count: number;
}

export function StyledPieChart({ stats, count }: PieChartProps): React.ReactElement {
  const data = processPieChartData(stats);
  return(
    <Grid container alignItems='center' style={{ padding: '16px' }}>
      <Grid item>
        <PieChart 
          series={[{ data, innerRadius: 120 }]} 
          width={400} 
          height={400}
          slotProps={{ legend: { hidden: true } }}
          colors={blueberryTwilightPaletteLight}
        >
          <PieCenterLabel>Total: {count}</PieCenterLabel>
        </PieChart>
      </Grid>
      <Grid item>
        <Table>
          <TableBody>
            {data.map(({ label, value }, index) => (
              <TableRow key={index}>
                <TableCell style={{ backgroundColor: blueberryTwilightPaletteLight[index] }} />
                <TableCell style={{ fontWeight: 'bold' }}> {label} </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}> {value} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}
