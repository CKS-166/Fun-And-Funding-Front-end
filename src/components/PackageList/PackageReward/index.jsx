import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Typography, Button } from '@mui/material';
import kuru from '../../../assets/ktm.jpg';
import './index.css';
import PackageItem from './PackageItem';
const PackageReward = () => {
    const type = 'free';
    const sampleArray = [1, 1, 1, 1];
    const sampleItemArray = [1, 1, 1,1,1,1];
    const number = 30000000;
    const formattedNumber = number.toLocaleString('de-DE');
    return (
        <div>
            <Grid container spacing={1} sx={{ marginTop: '78px' }}>
                {sampleArray.map((item, index) => (
                    <Grid key={index} size={6} sx={{ overflowY: 'auto' }}>
                        <Box className="package-reward" sx={{ height: '407px', overflowY: 'auto' }}>
                            <Box sx={{ display: 'flex', padding: '34px' }} >
                                <Box className='package-image' sx={{ width: '50%' }}>
                                    <img src={kuru} />
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Package 01</Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#1BAA64', marginTop: '10px' }}>{formattedNumber}</Typography>
                                    <Typography sx={{ fontSize: '12px', fontWeight: '400', opacity: 0.5, marginTop: '10px' }}>
                                        Special Edition of Castles of Burgundy, including all Stretch Goals, high-quality neoprene mat, Acrylic Hexes upgrade, and Acrylic Tiles upgrade
                                    </Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '700', marginTop: '10px' }}>
                                        50 out of 60 <span style={{ fontWeight: '400' }}>are left</span>
                                    </Typography>
                                    <Button sx={{
                                        width: "100%", whiteSpace: "nowrap"
                                        , background: "#1BAA64", fontWeight: "bold", py: 1,
                                        borderRadius: '8px', color: '#FFFFFF', marginTop: '10px'
                                    }}
                                        className='pledge-btn'>
                                        Pledge
                                    </Button>
                                </Box>
                            </Box>
                            <Box className='package-item' sx={{padding:'34px'}}>
                                <Grid container spacing={2}> 
                                {sampleItemArray.map((item, index) => (
                                    <Grid size={6}>
                                        <PackageItem />
                                    </Grid>
                                ))}
                                </Grid>
                                
                            </Box>
                        </Box>

                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default PackageReward
