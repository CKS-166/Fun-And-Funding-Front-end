import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Paper, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import React, { useState } from 'react';
import { FaSliders } from "react-icons/fa6";
import SearchBar from '../../components/SearchBar';
import SortDropdown from '../../components/SortDropdown';
import OwnerProjectCard from '../../components/UserProjectCard/OwnerProjectCard';
import PublicProjectCard from '../../components/UserProjectCard/PublicProjectCard';

function AccountProject() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSortOptions, setSelectedSortOptions] = useState([]);

    const ownerProjects = [1, 2, 3];
    const donatedProjects = [1, 2, 3];

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        console.log(value);
    };

    const sortOptions = [
        'Draft',
        'Funding',
        'Marketing',
    ];
    const handleSortChange = (values) => {
        setSelectedSortOptions(values);
    };

    return (
        <div>
            <Accordion defaultExpanded elevation={3} sx={{ mb: '2rem', borderRadius: '0.25rem !important', backgroundColor: '#F5F7F8', px: '1rem' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography sx={{ fontWeight: '700', fontSize: '1.25rem' }}>Dashboard</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', mb: '2rem', pb: '1rem' }}>
                <div className='py-[1.5rem] mx-[1rem]'>
                    <Typography sx={{ fontWeight: '700', fontSize: '1.25rem', mb: '2rem' }}>Your Project</Typography>
                    <div className='flex flex-row justify-between gap-[1rem] mb-[2rem]'>
                        <SearchBar onSearchChange={handleSearchChange} />
                        <Button sx={{
                            height: '2.5rem',
                            backgroundColor: '#EAEAEA',
                            boxShadow: '0.4rem',
                            p: '0.75rem',
                            color: '#2F3645',
                            "&:hover": {
                                backgroundColor: alpha("#EAEAEA", 0.85),
                            },
                            letterSpacing: '0.5px',
                        }}>
                            <FaSliders size={"1rem"} style={{ color: '#2F3645' }} />
                        </Button>
                        <SortDropdown options={sortOptions} onValueChange={handleSortChange} />
                    </div>
                    {ownerProjects.map((project, index) => (
                        <div key={index}>
                            <OwnerProjectCard project={project} />
                            {index !== ownerProjects.length - 1 && (
                                <Divider sx={{ my: '1.5rem' }} />
                            )}
                        </div>
                    ))}
                </div>
            </Paper>
            <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', pb: '1rem', mb: '2rem' }}>
                <div className='py-[1.5rem] mx-[1rem]'>
                    <Typography sx={{ fontWeight: '700', fontSize: '1.25rem', mb: '2rem' }}>Donated Project</Typography>
                    <div className='flex flex-row justify-between gap-[1rem] mb-[2rem]'>
                        <SearchBar onSearchChange={handleSearchChange} />
                        <Button sx={{
                            height: '2.5rem',
                            backgroundColor: '#EAEAEA',
                            boxShadow: '0.4rem',
                            p: '0.75rem',
                            color: '#2F3645',
                            "&:hover": {
                                backgroundColor: alpha("#EAEAEA", 0.85),
                            },
                            letterSpacing: '0.5px',
                        }}>
                            <FaSliders size={"1rem"} style={{ color: '#2F3645' }} />
                        </Button>
                        <SortDropdown options={sortOptions} onValueChange={handleSortChange} />
                    </div>
                    {donatedProjects.map((project, index) => (
                        <div key={index}>
                            <PublicProjectCard project={project} />
                            {index !== donatedProjects.length - 1 && (
                                <Divider sx={{ my: '1.5rem' }} />
                            )}
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    )
}

export default AccountProject