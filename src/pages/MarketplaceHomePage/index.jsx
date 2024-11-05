import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
const MarketplaceHomePage = () => {
    const sampleArray = [1, 1, 1, 1, 1, 1];
    return (
        <div>
            <div className='banner flex flex-col justify-center items-center h-[50vh] '>
                <Typography className="!text-[20px] text-[#1BAA64] !mb-4">Games collection</Typography>
                <Typography variant='h2' className="!mb-4">Fun&Funding Shop</Typography>
                <Typography className="!text-[16px] w-[50rem] font-[400] text-center opactiy-70 !mb-4">
                    The KidsGameShop is a curated collection of exciting, ready-to-play video games designed just for kids! Originally brought to life through crowdfunding, these games are now available instantly – no waiting required. Dive into fun, safe, and engaging adventures
                    for young players, delivered straight to your screen!
                </Typography>
            </div>
            <div className="game-container">
                <Grid container spacing={2}>
                    {sampleArray.map((item, index) => (
                        <Grid key={index} size={4}>
                            
                        </Grid>
                    )) }

                </Grid>
            </div>
        </div>
    )
}

export default MarketplaceHomePage