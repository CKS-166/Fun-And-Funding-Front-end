import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
const BarChartDashboard = ({ data }) => {
  console.log(data)
  // Extract xAxis and yAxis data
  const xAxis = data.map(item => item.packageName); // ["Package 1", "Non-package support", "Premium Package"]
  const yAxis = data.map(item => item.count);
  console.log(xAxis);
  console.log(yAxis);
  return (
    <Box sx={{ border: '1px solid black', padding: '10px' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxis }]}
        series={[{ data: yAxis }]}
        width={500}
        height={300}
      />
    </Box>

  )
}

export default BarChartDashboard