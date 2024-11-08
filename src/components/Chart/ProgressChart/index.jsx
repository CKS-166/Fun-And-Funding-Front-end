import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';
const ProgressChart = ({ balance, target }) => {
    const progress = (balance / target) * 100; // Calculate progress percentage
    const remaining = 100 - progress;          // Calculate remaining percentage
    console.log(progress, remaining)
    return (
        <Box sx={{ border: '1px solid black', padding: '10px' }}>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: progress, label: 'Progress' },
                            { id: 1, value: remaining, label: 'Remaining' },
                        ],
                        innerRadius: 30,     // Creates a donut-style chart
                        //   outerRadius: 1,       // Controls the size of the pie
                    },
                ]}
                width={400}
                height={200}
            />
        </Box>

    );
}

export default ProgressChart
