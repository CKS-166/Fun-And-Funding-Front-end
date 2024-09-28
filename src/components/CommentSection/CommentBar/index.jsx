import React from 'react'
import { Typography, Avatar, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './index.css'
function CommentBar() {
    return (
        <Box sx={{
            background: '#FFFFFF', height: '170px'
            , borderRadius: '5px', padding: '22px', marginBottom: '15px',
            border: '1px solid rgba(0, 0, 0, 0.3)'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    Backer
                </Box>

            </Box>
            <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: '400',margin : '10px 0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                </Typography>
            </Box>
        </Box>

    )
}

export default CommentBar