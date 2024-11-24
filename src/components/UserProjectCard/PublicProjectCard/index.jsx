import { Typography } from '@mui/material';
import React from 'react';
import ktm from '../../../assets/images/ktm.jpg';

function PublicProjectCard({ project, projectType }) {

    return (
        <div className="flex items-center rounded-md gap-[2rem]">
            <div className="w-[10rem] h-[10rem] bg-[#EAEAEA] flex justify-center items-center">
                <img src={ktm} style={{ width: '10rem', height: '10rem', objectFit: 'cover', borderRadius: '5px' }} />
            </div>
            <div className="flex-grow !w-[12rem] h-fit">
                <div className="flex items-center mb-[0.5rem] gap-[1rem]">
                    <a href={projectType == "Funding" ? `/funding-detail/${project.id}` : `/marketplace-detail/${project.id}`}>
                        <Typography
                            sx={{
                                color: '#2F3645',
                                width: '12rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                            }}
                            className='user-project-card'
                        >
                            {project.name}
                        </Typography>
                    </a>
                    <div className='flex items-center'>
                        {projectType == "Funding" ?
                            <span className="ml-[1rem] bg-[#1BAA64] text-[0.75rem] text-[#EAEAEA] px-[0.5rem] py-[0.25rem] rounded">
                                Funding
                            </span> : <span className="ml-[1rem] bg-[#FABC3F] text-[0.75rem] text-[#F5F7F8] px-[0.5rem] py-[0.25rem] rounded">
                                Marketing
                            </span>
                        }
                    </div>
                </div>
                <Typography sx={{ color: '#2F3645', fontWeight: '600', fontSize: '1rem', mb: '1.25rem' }} >
                    by <span className='text-[#1BAA64]'>{project?.user.userName}</span>
                </Typography>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontWeight: '300',
                        fontSize: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                >
                    {project.description}
                </Typography>
            </div>
        </div>
    );
}

export default PublicProjectCard;