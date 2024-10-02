import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import React, { useState } from 'react';
import ktm from '../../../assets/images/ktm.jpg';
import "./index.css";

const options = [
    'Edit campaign',
    'Remove campaign',
];

function OwnerProjectCard({ project }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
    };

    return (
        <div className="flex items-center rounded-md gap-[2rem]">
            <div className="w-[8rem] h-[8rem] bg-[#EAEAEA] flex justify-center items-center">
                <img src={ktm} style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '5px' }} />
            </div>
            <div className="flex-grow !w-[12rem] h-fit">
                <div className="flex items-center mb-[0.5rem] gap-[1rem]">
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
                        Hihiaaaaaaaaaaaaaa
                    </Typography>
                    <div className='flex items-center'>
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
                    value={selectedOption}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => {
                        return selected.length === 0 ? <Typography>Action</Typography> : <Typography>{selected}</Typography>;
                    }}
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
                        "&:hover": {
                            backgroundColor: alpha("#EAEAEA", 0.85),
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
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Typography>{option}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default OwnerProjectCard;