import { Divider, Typography } from '@mui/material'
import React from 'react'

function Media() {
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
                    Media files
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

                    Provide dynamic images and videos to showcase your project's unique features, giving backers a more immersive experience.
                    Visual content helps engage supporters, build excitement, and foster stronger connections to your project's vision.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Project thumbnail<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Provide a sharp, dynamic image for your project thumbnail.
                </Typography>
            </div>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    className='basic-info-title'
                >
                    Project demo<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Provide a 1-3 minute video introducing your project.
                </Typography>
            </div>
            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', ml: '4rem', mr: '3rem' }} />
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Project bonus images
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Provide images that showcase different aspects of your project.
                </Typography>
            </div>
        </div>
    )
}

export default Media