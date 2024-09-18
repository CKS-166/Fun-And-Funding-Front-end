import React from 'react'
import { Typography, Avatar, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './index.css'
function CommentBar() {
    return (
        <Box>
            <Box sx={{display : 'flex', alignItems : 'center'}}>
                <Avatar sx={{width : '60px', height : '60px', marginRight : '10px'}}>H</Avatar>
                <Box sx={{marginRight : '10px'}}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
                        SuperIdol123
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#1BAA64' }}>
                        9/9/2024
                    </Typography>
                </Box>
                <Box>
                    Backer
                </Box>
            </Box>
        </Box>

    )
}

export default CommentBar