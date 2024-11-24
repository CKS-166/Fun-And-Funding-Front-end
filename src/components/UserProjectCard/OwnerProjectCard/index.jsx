import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import React, { useState } from 'react';
import "./index.css";

function OwnerProjectCard({ project, projectType }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    console.log(project);
    return (
        <div className="flex items-center rounded-md gap-[2rem]">
            <div className="w-[10rem] h-[10rem] bg-[#EAEAEA] flex justify-center items-center">
                <img src={projectType == "Funding" ? project?.fundingFiles?.find(p => p.filetype == 2 && p.isDeleted == false).url : project?.marketplaceFiles?.find(p => p.fileType == 2 && p.isDeleted == false).url} style={{ width: '10rem', height: '10rem', objectFit: 'cover', borderRadius: '5px' }} />
            </div>
            <div className="flex-grow !w-[12rem] h-fit">
                <div className="flex items-center mb-[0.5rem] gap-[1rem]">
                    <a href={projectType == "Funding" ? `funding-detail/${project.id}` : `marketplace-detail/${project.id}`}>
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
            <FormControl sx={{
                minWidth: '8rem', height: '2.5rem',
                '.MuiOutlinedInput-notchedOutline': { border: '0 !important' },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    border: '0 !important',
                },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: '0 !important',
                },
            }}>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(value) =>
                        value ? (
                            <Typography>{value}</Typography>
                        ) : (
                            <Typography sx={{ color: 'var(--black)' }}>Action</Typography>
                        )
                    }
                    sx={{
                        backgroundColor: '#EAEAEA',
                        border: 'none !important',
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiSelect-select': {
                            padding: '0 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            height: '2.5rem',
                        },
                        '&:hover': {
                            backgroundColor: alpha('#EAEAEA', 0.85),
                        },
                        height: '2.5rem',
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                minWidth: '12rem',
                                marginTop: '0.5rem',
                            },
                        },
                    }}
                >
                    <MenuItem value="edit" onClick={() => window.open(`/account/projects/update/${project.id}/basic-info`, '_blank')}>
                        <Typography>Edit campaign</Typography>
                    </MenuItem>
                    <MenuItem value="remove">
                        <Typography>Remove campaign</Typography>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default OwnerProjectCard;