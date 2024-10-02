import { Typography } from '@mui/material';
import React from 'react';
import ktm from '../../../assets/images/ktm.jpg';

function PublicProjectCard({ project }) {

    return (
        <div className="flex items-center rounded-md gap-[2rem]">
            <div className="w-[8rem] h-[8rem] bg-[#EAEAEA] flex justify-center items-center">
                <img src={ktm} style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '5px' }} />
            </div>
            <div className="flex-grow !w-[12rem] h-fit">
                <div className="flex items-center mb-[0.5rem]">
                    <Typography sx={{
                        color: '#2F3645', maxWidth: '12rem', width: 'fit-content', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical',
                    }} className='user-project-card'
                    >
                        Hihiaaaaaaaaaaaaaa
                    </Typography>
                    <span className="ml-[1rem] bg-[#EAEAEA] text-[0.75rem] text-[#2F3645] px-[0.5rem] py-[0.25rem] rounded">
                        Draft
                    </span>
                    <span className="ml-[1rem] bg-[#1BAA64] text-[0.75rem] text-[#EAEAEA] px-[0.5rem] py-[0.25rem] rounded">
                        Funding
                    </span>
                    <span className="ml-[1rem] bg-[#2F3645] text-[0.75rem] text-[#EAEAEA] px-[0.5rem] py-[0.25rem] rounded">
                        Marketing
                    </span>
                </div>
                <Typography sx={{ color: '#2F3645', fontWeight: '600', fontSize: '1rem', mb: '1.25rem' }} >
                    by <span className='text-[#1BAA64]'>Do yoo lim</span>
                </Typography>
                <Typography sx={{
                    color: '#2F3645',
                    fontWeight: '300',
                    fontSize: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                }}>
                    Hihiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Typography>
            </div>
        </div>
    );
}

export default PublicProjectCard;