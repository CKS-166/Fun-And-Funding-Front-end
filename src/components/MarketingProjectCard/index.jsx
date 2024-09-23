import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import Media from '../../assets/ktm.jpg';

function MarketingProjectCard() {
    return (
        <Card sx={{ width: '22.75rem', borderRadius: '0.625rem' }}>
            <CardMedia
                component='img'
                image={Media}
                loading='lazy'
                sx={{ width: '22.75rem', height: '13.75rem' }}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MarketingProjectCard