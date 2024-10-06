import { Divider, Typography } from '@mui/material'
import React from 'react'

function Packages() {
    return (
        <div className='w-full pb-[5rem]'>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        userSelect: 'none',
                        width: '100%',
                        marginBottom: '1rem'
                    }}
                >
                    Donation Packages
                </Typography>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1rem',
                        fontWeight: '400',
                        userSelect: 'none',
                        width: '100%',
                    }}
                >
                    Set up your donate packages with corresponding rewards.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    All Packages<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Set up support packages along with accompanying items and perks.
                </Typography>
            </div>
            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', ml: '4rem', mr: '3rem' }} />
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Grading limit for free donation<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Although the project offer a free donation option, but if a backer donates over a certain amount, they can join other package donors in grading the project milestones.
                    This allows higher-tier supporters to participate in evaluating key progress updates.
                </Typography>
            </div>
        </div>
    )
}

export default Packages