import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import MarketplaceProjectIntro from "../../components/MarketplaceProjectIntro";

function MarketplaceUpdateContent({ content }) {
    return (
        <Paper sx={{ backgroundColor: 'var(--white)', borderRadius: '0.625rem', p: '3rem' }} elevation={3}>
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontWeight: '500',
                    color: 'var(--black)',
                    mb: '1rem'
                }}
            >
                UPDATE (#1)
            </Typography>
            <Typography
                sx={{
                    fontSize: "1.5rem",
                    fontWeight: '600',
                    color: 'var(--black)',
                    mb: '2rem'
                }}
            >
                Update game file version
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    marginBottom: '2rem'
                }}
            >
                <div className='flex flex-row items-center flex-grow-0'>
                    <Avatar
                        sx={{
                            width: "3.5rem",
                            height: "3.5rem",
                            marginRight: "1rem",
                        }}
                        src={''}
                    />
                    <Box>
                        <a href={`/profile/`}>
                            <Typography
                                sx={{
                                    fontSize: "1.25rem",
                                    fontWeight: '600',
                                    width: '15rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: 'var(--black)',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Team Cherry
                            </Typography>
                        </a>
                        <Typography sx={{ fontSize: "0.75rem", opacity: "0.6", color: 'var(--black)' }}>
                            13/11/2024 10:47 pm
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box>
                <MarketplaceProjectIntro intro={""} />
            </Box>
        </Paper>
    )
}

export default MarketplaceUpdateContent