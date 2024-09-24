import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import Media from '../../assets/ktm.jpg';
import './index.css';

function FundingProjectCard() {
    return (
        <Card sx={{ width: '22.75rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8' }}>
            <CardMedia
                component='img'
                image={Media}
                loading='lazy'
                sx={{ width: '22.75rem', height: '13.75rem', objectFit: 'cover' }}
            />
            <CardContent sx={{ px: '2rem !important' }} className='parent-card'>
                <Card className='children-card'>
                    <CardMedia
                        component='img'
                        image={Media}
                        loading='lazy'
                        sx={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
                    />
                    <div>

                    </div>
                </Card>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FundingProjectCard