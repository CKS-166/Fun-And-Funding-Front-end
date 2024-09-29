import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import kuru from '../../assets/images/ktm.jpg'
const UpdatesSection = () => {
    return (
        <>
            <Box sx={{
                width: '800px', border: '1px solid rgba(0, 0, 0, 0.3)'
                , padding: '45px', borderRadius: '10px', background: '#FFFFFF'
            }}>
                <Typography sx={{ color: 'rgba(0,0,0,0.5)' }}>Update #1</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '24px' }}>
                    First Update: Game have been launched and being test
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                    <Avatar sx={{ width: '60px', height: '60px', marginRight: '10px' }}>H</Avatar>
                    <Box sx={{ marginRight: '10px' }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
                            SuperIdol123
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#1BAA64' }}>
                            9/9/2024
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: '82px', height: '27px', color: '#FFFFFF'
                        , background: '#1BAA64', textAlign: 'center', borderRadius: '8px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        Creator
                    </Box>

                </Box>
                <Typography sx={{
                    background: 'rgba(0, 0, 0, 0.3)', width: '700px', height: '1px',
                    marginTop: '8px'
                }}></Typography>
                <Box>
                    <img src={kuru} style={{
                        width: '700px', height: '185px', objectFit: 'cover',
                        objectPosition: '50% 50%', marginTop: '10px'
                    }} />
                </Box>
                <Box sx={{ marginTop: '27px' }}>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default UpdatesSection