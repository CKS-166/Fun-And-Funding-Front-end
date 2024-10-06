import { Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import QuillEditor from "../QuillEditor";
import './index.css';

function BasicInformation() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            categories: [
                {
                    id: ''
                }
            ],
            projectName: '',
            description: '',
        }
    });

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
                    Basic Information
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
                    Create a strong first impression by introducing your campaign's goals and sparking interest.
                    This essential information will appear on your campaign page, campaign card, and in search results, helping people easily discover and learn more about your campaign.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Project Name<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    What is the title of your project?
                </Typography>
                <TextField
                    placeholder='Project name...'
                    className="custom-update-textfield"
                    variant="outlined"
                    {...register("projectName", { required: "Project name is required" })}
                    error={!!errors.projectName}
                    helperText={errors.projectName?.message}
                />
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Project Description<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Provide a short description that best describes your campaign to your audience.
                </Typography>
                <TextField
                    placeholder='Project description...'
                    className="custom-update-textfield"
                    rows={4}
                    multiline
                    variant="outlined"
                    {...register("description", { required: "Description is required" })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            </div>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    className='basic-info-title'
                >
                    Project Category<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    To help backers find your campaign, select a category that best represents your project.
                </Typography>
                <FormControl className="custom-update-textfield" variant="outlined" error={!!errors.category}>
                    <Select
                        value={selectedCategory || ''}
                        displayEmpty
                        onChange={(e) => setValue("categories", { id: e.target.value })}
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#989a9a' }}>Project category...</span>;  // Placeholder color
                            }
                            return categories.find(category => category.id === selected)?.name;
                        }}
                    >
                        <MenuItem value='' disabled sx={{ color: '#989a9a' }}>
                            Project category...
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category && <p className="text-red-600">{errors.category.message}</p>}
                </FormControl>
            </div>
            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', ml: '4rem', mr: '3rem' }} />
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Project Introduction<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Share and introduce the story behind the project.
                </Typography>
                <QuillEditor />
            </div>
        </div>
    )
}

export default BasicInformation