import { Button, Card, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FaRegBookmark } from "react-icons/fa6";
import Media from '../../assets/images/ktm.jpg';

function BrowseMarketingCard() {
    return (
        <Card sx={{ width: '18.5rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8', position: 'relative' }}>
            <CardMedia
                component='img'
                image={Media}
                loading='lazy'
                sx={{ width: '18.5rem', height: '13.75rem', objectFit: 'cover' }}
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
            <CardContent sx={{ px: '1.5rem !important', marginBottom: '0.5rem' }} className='parent-card'>
                <div className='mt-[0.25rem]'>
                    <Typography sx={{ color: '#2F3645', fontWeight: '700', mb: '0.5rem', width: 'fit-content' }} className='project-card-name'>
                        Hollow Knight
                    </Typography>
                    <Typography
                        sx={{
                            color: '#2F3645',
                            fontWeight: '400',
                            fontSize: '0.875rem',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        A beautiful and mysterious 2D adventure through a surreal world of insects and heroes. A game for PC, Mac, Xbox and Linux.
                    </Typography>
                    <div className='flex flex-row justify-between align-bottom mt-[1rem]'>
                        <div className='flex justify-center flex-col'>
                            <div className='flex flex-row gap-[0.5rem] mb-[1rem]'>
                                <Chip size='small' label="Adventure" sx={{ borderRadius: '0.313rem', fontSize: '0.75rem', backgroundColor: '#F5F7F8', border: '2px solid #EAEAEA' }} />
                                <Chip size='small' label="Horror" sx={{ borderRadius: '0.313rem', fontSize: '0.75rem', backgroundColor: '#F5F7F8', border: '2px solid #EAEAEA' }} />
                            </div>
                            <div>
                                <Typography sx={{ fontWeight: '700', width: 'fit-content', fontSize: '1.5rem', color: 'var(--primary-green)', textAlign: 'center' }}>
                                    100.000 <span style={{ fontSize: '1rem', color: 'var(--black)' }}>VND</span>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BrowseMarketingCard