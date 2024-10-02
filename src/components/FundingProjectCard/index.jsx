import { Button, Card, Chip, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FaRegBookmark } from "react-icons/fa6";
import Media from '../../assets/images/ktm.jpg';
import './index.css';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: '0.25rem',
    borderRadius: 40,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#EAEAEA",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 40,
        backgroundColor: "#1BAA64",
    },
}));

function FundingProjectCard() {
    return (
        <Card sx={{ width: '22.75rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8', position: 'relative' }}>
            <CardMedia
                component='img'
                image={Media}
                loading='lazy'
                sx={{ width: '22.75rem', height: '13.75rem', objectFit: 'cover' }}
            />
            <Button
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: '#F5F7F8',
                    border: '1px solid #EAEAEA',
                    boxShadow: '0.4rem',
                    p: '0.75rem',
                    color: '#2F3645',
                    minWidth: '0',
                    '&:hover': {
                        backgroundColor: '#DDDDDD',
                    },
                    letterSpacing: '0.5px',
                    zIndex: 2
                }}
            >
                <FaRegBookmark size={'1rem'} style={{ strokeWidth: '1rem' }} />
            </Button>
            <CardContent sx={{ px: '2rem !important', marginBottom: '0.5rem' }} className='parent-card'>
                <Card className='children-card' sx={{ backgroundColor: '#F5F7F8' }}>
                    <CardMedia
                        component='img'
                        image={Media}
                        loading='lazy'
                        sx={{ width: '4.2rem !important', height: '4.2rem !important', objectFit: 'cover' }}
                    />
                    <div className='flex flex-col justify-center mx-[1rem] my-[0.5rem] w-[14.75rem]'>
                        <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                            20.000.000 VND
                        </Typography>
                        <BorderLinearProgress variant="determinate" sx={{ width: "100%", my: '0.313rem' }} value={60} />
                        <div className='flex flex-row justify-between'>
                            <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                                696 Investors
                            </Typography>
                            <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                                50% of target
                            </Typography>
                        </div>
                    </div>
                </Card>
                <div className='mt-[2rem]'>
                    <Typography sx={{ color: '#2F3645', fontWeight: '700', mb: '1rem', width: 'fit-content' }} className='project-card-name'>
                        Hollow Knight
                    </Typography>
                    <Typography sx={{ color: '#2F3645', fontWeight: '400', fontSize: '0.875rem' }}>
                        A beautiful and mysterious 2D adventure through a surreal world of insects and heroes. A game for PC, Mac, Xbox and Linux.
                    </Typography>
                    <div className='mt-[1.75rem]'>
                        <Chip label="50 days remaining" sx={{ borderRadius: '0.313rem', fontSize: '0.875rem', mb: '1rem' }} />
                        <div className='flex flex-row gap-[0.5rem]'>
                            <Chip label="Adventure" sx={{ borderRadius: '0.313rem', fontSize: '0.875rem', backgroundColor: '#F5F7F8', border: '2px solid #EAEAEA' }} />
                            <Chip label="Horror" sx={{ borderRadius: '0.313rem', fontSize: '0.875rem', backgroundColor: '#F5F7F8', border: '2px solid #EAEAEA' }} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default FundingProjectCard