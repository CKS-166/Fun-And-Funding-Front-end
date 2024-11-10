import { Button, Card, Chip, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FaRegBookmark } from "react-icons/fa6";
import './index.css';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: '0.25rem',
    borderRadius: 40,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#D8D8D8",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 40,
        backgroundColor: "#1BAA64",
    },
}));

function HomeMarketingProjectCard({ marketplaceProject }) {
    return (
        <Card sx={{ width: '22.75rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8', position: 'relative', boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)' }}>
            <CardMedia
                component="img"
                image={marketplaceProject?.marketplaceFiles.find((file) => file.fileType === 2)?.url || ''}
                loading="lazy"
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
                <div className='mt-[0.5rem]'>
                    <Typography sx={{ color: '#2F3645', fontWeight: '700', mb: '1rem', width: 'fit-content' }} className='project-card-name'>
                        {marketplaceProject.name}
                    </Typography>
                    <Typography sx={{
                        color: '#2F3645', fontWeight: '400', fontSize: '0.875rem', width: 'fit-content',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '4rem'
                    }}>
                        {marketplaceProject.description}
                    </Typography>
                    <div className='flex flex-row justify-between align-bottom mt-[1.75rem]'>
                        <div>
                            <div className='flex flex-row gap-[0.5rem] overflow-x-auto pb-[0.5rem] w-[10rem]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <style>
                                    {`
                                    .scrollable-category::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}
                                </style>
                                {marketplaceProject.categories && marketplaceProject.categories.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item.name}
                                        className="scrollable-category"
                                        sx={{
                                            borderRadius: '0.313rem',
                                            fontSize: '0.875rem',
                                            backgroundColor: '#F5F7F8',
                                            border: '2px solid #EAEAEA',
                                            whiteSpace: 'nowrap',
                                        }}
                                    />
                                ))}
                            </div>
                            <Chip label="PC" sx={{ borderRadius: '0.313rem', fontSize: '0.875rem' }} />
                        </div>
                        <div>
                            <Typography sx={{ color: 'var(--black)', fontWeight: '700', mb: '0.5rem', width: 'full', fontSize: '1.5rem', textAlign: 'right' }}>
                                VND
                            </Typography>
                            <Typography sx={{ fontWeight: '700', width: 'fit-content', fontSize: '1.5rem', color: 'var(--primary-green)', textAlign: 'right' }}>
                                {marketplaceProject.price.toLocaleString('de-DE')}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HomeMarketingProjectCard