import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

function CommentCard() {
    return (
        <Card sx={{ width: '17.375rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', py: '1.5rem !important', px: '2.5rem !important' }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <FormatQuoteIcon sx={{ fontSize: '1.5rem', color: '#1BAA64' }} />
                </Box>
                <Divider sx={{ backgroundColor: '#1BAA64', mb: '1rem', borderBottomWidth: '2px' }} />
                <Typography sx={{ fontWeight: '400', fontSize: '1rem', color: '#2F3645', textAlign: 'left', mb: '1rem' }}>
                    "Love this platform! It's easy to navigate, with great games to support. The crowdfunding is smooth, and projects update quickly. Highly recommend for gamers and developers!"
                </Typography>
                <Divider sx={{ backgroundColor: '#1BAA64', mb: '1rem', borderBottomWidth: '2px' }} />
                <div className='flex flex-row gap-[1rem]'>
                    <Avatar src='' sx={{
                        width: '1.5rem', height: '1.5rem'
                    }} />
                    <Typography sx={{ fontWeight: '700', fontSize: '1rem', color: '#2F3645', marginBottom: '1.5rem' }}>
                        phonCk
                    </Typography>
                </div>
            </CardContent>
        </Card >
    )
}

export default CommentCard