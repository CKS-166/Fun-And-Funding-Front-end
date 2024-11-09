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
        backgroundColor: "#EAEAEA",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 40,
        backgroundColor: "#1BAA64",
    },
}));

function HomeFundingProjectCard({ fundingProject }) {
    const calculateDaysLeft = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            const timeDiff = start - now;
            const daysTillStart = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            return `${daysTillStart} days till start`;
        } else if (now < end) {
            const timeDiff = end - now;
            const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.ceil((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if (hoursRemaining === 24) {
                return `${daysRemaining + 1} days remaining`;
            } else {
                return `${daysRemaining} days ${hoursRemaining} hours remaining`;
            }
        } else {
            return "Campaign already ended";
        }
    }

    const convertPercentage = (a, b) => Math.ceil((a / b) * 100);

    return (
        <Card sx={{ width: '22.75rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8', position: 'relative', boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)' }}>
            <CardMedia
                component='img'
                image={fundingProject?.fundingFiles.find((file) => file.filetype === 2 && file.isDeleted == false)?.url || ''}
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
                        image={fundingProject?.fundingFiles.find((file) => file.filetype === 2 && file.isDeleted == false)?.url || ''}
                        loading='lazy'
                        sx={{ width: '4.2rem !important', height: '4.2rem !important', objectFit: 'cover' }}
                    />
                    <div className='flex flex-col justify-center mx-[1rem] my-[0.5rem] w-[14.75rem]'>
                        <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                            {fundingProject.balance.toLocaleString('de-DE')} VND
                        </Typography>
                        <BorderLinearProgress variant="determinate" sx={{ width: "100%", my: '0.313rem' }} value={convertPercentage(fundingProject.balance, fundingProject.target)} />
                        <div className='flex flex-row justify-between'>
                            <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                                696 Investors
                            </Typography>
                            <Typography sx={{ color: '#2F3645', fontSize: '0.75rem', fontWeight: '600' }}>
                                {convertPercentage(fundingProject.balance, fundingProject.target)}% of target
                            </Typography>
                        </div>
                    </div>
                </Card>
                <div className='mt-[2rem]'>
                    <Typography
                        sx={{
                            color: '#2F3645',
                            fontWeight: '700',
                            mb: '1rem',
                            width: 'fit-content',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        className='project-card-name'
                    >
                        {fundingProject.name}
                    </Typography>
                    <Typography sx={{
                        color: '#2F3645', fontWeight: '400', fontSize: '0.875rem', width: 'fit-content',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '3rem'
                    }}>
                        {fundingProject.description}
                    </Typography>
                    <div className='mt-[1.75rem] w-[18.75rem]'>
                        <Chip label={calculateDaysLeft(fundingProject.startDate, fundingProject.endDate)} sx={{ borderRadius: '0.313rem', fontSize: '0.875rem', mb: '1rem' }} />
                        <div className='flex flex-row gap-[0.5rem] overflow-x-auto pb-[0.5rem]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style>
                                {`
                                    .scrollable-category::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}
                            </style>
                            {fundingProject.categories && fundingProject.categories.map((item, index) => (
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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default HomeFundingProjectCard;
