import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import React, { useEffect, useRef, useState } from 'react';

function RevenueLineChart() {
    const [chartWidth, setChartWidth] = useState(600);
    const chartContainerRef = useRef(null);

    const xAxisData = [
        "23-11-2024", "24-11-2024", "25-11-2024", "26-11-2024", "27-11-2024",
        "28-11-2024", "29-11-2024", "30-11-2024", "01-12-2024", "02-12-2024",
        "03-12-2024", "04-12-2024", "05-12-2024", "06-12-2024", "07-12-2024",
        "08-12-2024", "09-12-2024", "10-12-2024", "11-12-2024", "12-12-2024",
        "13-12-2024", "14-12-2024", "15-12-2024", "16-12-2024", "17-12-2024",
        "18-12-2024", "19-12-2024", "20-12-2024", "21-12-2024", "22-12-2024"
    ];

    const seriesData = [
        7644941, 2838283, 7627319, 5602697, 6585596, 4509161, 7343150,
        6881542, 4720575, 7119217, 3541768, 3368153, 3877797, 9872244,
        8926484, 4331822, 4758221, 5172563, 2681872, 9191520, 4909892,
        7077925, 6290321, 6165836, 3776823, 7481191, 2823818, 3941532,
        8489861, 7906123
    ];

    useEffect(() => {
        const handleResize = () => {
            if (chartContainerRef.current) {
                setChartWidth(chartContainerRef.current.offsetWidth);
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Paper
            elevation={3}
            ref={chartContainerRef}
            sx={{
                borderRadius: '0.625rem',
                pb: '2rem',
                pt: '1.5rem',
                px: '1.5rem',
                boxShadow:
                    '0px 2px 2px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                mb: '2rem',
                height: 'fit-content',
                overflow: 'hidden',
            }}
        >
            <div className='flex flex-row justify-between items-center'>
                <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--grey)' }}>
                    Cost Analysis
                    <Tooltip title={
                        <span>
                            Showing your platform revenue <br />
                            for the past month.
                        </span>
                    } arrow>
                        <IconButton
                            sx={{
                                color: 'var(--grey)',
                                '&:hover': {
                                    color: 'var(--black)',
                                },
                            }}
                            size="small"
                        >
                            <ErrorOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--black)' }}>
                    November 23, 2024 - December 23, 2024
                </Typography>
            </div>
            <LineChart
                xAxis={[{ scaleType: 'band', data: xAxisData }]}
                yAxis={[{
                    scaleType: 'linear',
                    tickFormat: (value) => value.toLocaleString(),
                    min: 0,
                }]}
                series={[
                    {
                        data: seriesData,
                        area: true,
                        color: '#2f3645',
                        fillOpacity: 0.2
                    },
                ]}
                width={chartWidth}
                height={300}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                    mt: '1rem',
                }}
            />
        </Paper>
    );
}

export default RevenueLineChart;
