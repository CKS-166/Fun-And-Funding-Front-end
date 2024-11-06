import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import ktm from '../../assets/images/ktm.jpg';
import MarketPlaceCard from '../../components/MarketplaceProject/MarketplaceCard';
import './index.css'
const MarketplaceHomePage = () => {
    const sampleArray = [1, 1, 1, 1, 1, 1];
    return (
        <div>
            <div className='banner flex flex-col justify-center items-center h-[100vh] '>
                <Typography className="!text-[20px] text-[#1BAA64] !mb-4">Games collection</Typography>
                <Typography variant='h2' className="!mb-4">Fun&Funding Shop</Typography>
                
                <Typography className="!text-[16px] w-[50rem] font-[400] text-center opactiy-70 !mb-4">
                    The KidsGameShop is a curated collection of exciting, ready-to-play video games designed just for kids! Originally brought to life through crowdfunding, these games are now available instantly – no waiting required. Dive into fun, safe, and engaging adventures
                    for young players, delivered straight to your screen!
                </Typography>
            </div>
            {/* <div className="container mx-auto"> */}
                <Box sx={{display : 'flex', justifyContent : 'center', alignItems : 'center', marginTop : '5rem'}}>
                <Grid container spacing={2} sx={{justifyContent : 'center', alignItems : 'center'}}>
                    {sampleArray.map((item, index) => (
                        <Grid key={index} size={4} sx={{display : 'flex',
                            flexDirection : 'column',
                            justifyContent : 'center',
                            alignItems : 'center'
                        }}>
                            <MarketPlaceCard price={20000} image={ktm} title={"Math Game"}/>
                        </Grid>
                    )) }

                </Grid>
                </Box>

            {/* </div> */}
        </div>
    )
}

export default MarketplaceHomePage