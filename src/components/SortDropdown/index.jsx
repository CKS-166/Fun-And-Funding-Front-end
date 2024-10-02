import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import React, { useState } from 'react';

const SortDropdown = ({ options, onValueChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(value);
        onValueChange(value);
    };

    return (
        <FormControl sx={{
            minWidth: '12rem', height: '2.5rem',
            '.MuiOutlinedInput-notchedOutline': { border: '0 !important' },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            {
                border: '0 !important',
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                border: '0 !important',
            },
        }}>
            <Select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Typography>Sort by</Typography>;
                    } else if (selected.length === 1) {
                        return <Typography sx={{ color: '#1BAA64', fontWeight: '600' }}>{selected[0]}</Typography>;
                    } else {
                        return <Typography sx={{ color: '#1BAA64', fontWeight: '600' }}>Multiple</Typography>;
                    }
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
                            marginTop: '0.5rem'
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option === selectedOptions ? (
                            <Box sx={{ backgroundColor: '#1BAA64', color: '#F5F7F8', padding: '0.5rem', width: '100%' }}>
                                {option}
                            </Box>
                        ) : (
                            <Typography>{option}</Typography>
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortDropdown;