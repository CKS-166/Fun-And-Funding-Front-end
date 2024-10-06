import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Collapse, Container, Grid2, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { editorList, milestoneList } from './UpdateFundingProjectLayout';
import './index.css';

function UpdateFundingProjectLayout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditExpanded, setIsEditExpanded] = useState(false);
    const [isMilestoneExpanded, setIsMilestoneExpanded] = useState(false);

    const handleEditToggle = () => {
        setIsEditExpanded(!isEditExpanded);
    };
    const handleMilestoneToggle = () => {
        setIsMilestoneExpanded(!isMilestoneExpanded);
    };

    const handleNavigation = (link) => {
        navigate(link);
    };

    const isEditorActive = editorList.some((item) => location.pathname.includes(item.link));
    const isMilestoneActive = milestoneList.some((item) => location.pathname.includes(item.link));

    return (
        <Container sx={{ mx: '0', px: '0 !important', width: '100% important', maxWidth: '100% !important' }}>
            <Grid2 container>
                <Grid2
                    size={2.5}
                    sx={{
                        minHeight: '100vh',
                        backgroundColor: '#2F3645',
                        pt: '4rem',
                        color: '#F5F7F8',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'visible',
                    }}
                >
                    <div className='mb-[8rem]'>
                        <div className='flex flex-col gap-[0.5rem] px-[2rem]'>
                            <span className="bg-[#1BAA64] text-[0.75rem] text-[#EAEAEA] px-[0.5rem] py-[0.25rem] rounded w-fit font-semibold">
                                Funding
                            </span>
                            <Typography
                                sx={{
                                    color: '#F5F7F8',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    userSelect: 'none',
                                    width: '100%',
                                }}
                            >
                                Hollow Knight: Silk Song
                            </Typography>
                        </div>
                        <div className='sticky top-0'>
                            <div className='mt-[2rem]'>
                                <Typography className='update-project-section'>
                                    Project Preview
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    className='update-project-section'
                                    onClick={handleEditToggle}
                                    sx={{
                                        backgroundColor: isEditorActive && !isEditExpanded ? '#88D1AE' : 'transparent',
                                        color: isEditorActive && !isEditExpanded ? '#F5F7F8' : 'inherit'
                                    }}
                                >
                                    Project Editor
                                    <IconButton sx={{ color: '#F5F7F8', ml: 1 }} size="small">
                                        {isEditExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </Typography>
                                <Collapse in={isEditExpanded} timeout="auto" unmountOnExit>
                                    <List component="nav">
                                        {editorList.map((item) => (
                                            <ListItem
                                                button
                                                key={item.name}
                                                onClick={() => handleNavigation(item.link)}
                                                sx={{
                                                    backgroundColor: location.pathname.includes(item.link) ? '#88D1AE' : 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#88D1AE',
                                                        '& .MuiListItemText-root': {
                                                            color: '#F5F7F8',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={item.name}
                                                    sx={{
                                                        color: location.pathname.includes(item.link) ? '#F5F7F8' : '#F5F7F8',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        height: '2rem',
                                                        px: '2rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                            <div>
                                <Typography
                                    className='update-project-section'
                                    onClick={handleMilestoneToggle}
                                    sx={{
                                        backgroundColor: isMilestoneActive && !isMilestoneExpanded ? '#88D1AE' : 'transparent',
                                        color: isMilestoneActive && !isMilestoneExpanded ? '#F5F7F8' : 'inherit'
                                    }}
                                >
                                    Project Milestones
                                    <IconButton sx={{ color: '#F5F7F8', ml: 1 }} size="small">
                                        {isMilestoneExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </Typography>
                                <Collapse in={isMilestoneExpanded} timeout="auto" unmountOnExit>
                                    <List component="nav">
                                        {milestoneList.map((item) => (
                                            <ListItem
                                                button
                                                key={item.name}
                                                onClick={() => handleNavigation(item.link)}
                                                sx={{
                                                    backgroundColor: location.pathname.includes(item.link) ? '#88D1AE' : 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#88D1AE',
                                                        '& .MuiListItemText-root': {
                                                            color: '#F5F7F8',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={item.name}
                                                    sx={{
                                                        color: location.pathname.includes(item.link) ? '#F5F7F8' : '#F5F7F8',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        height: '2rem',
                                                        px: '2rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Typography className='update-project-section'>
                            Learn More About Crowdfunding Policy
                        </Typography>
                        <Typography className='update-project-section'>
                            Get Help & Support
                        </Typography>
                    </div>
                </Grid2>
                <Grid2 size={9.5}>
                    <div className='relative'>
                        <div className='fixed-update-header'>
                            <div>
                                <Typography
                                    sx={{
                                        color: '#2F3645',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        userSelect: 'none',
                                        width: '100%',
                                    }}
                                >
                                    Project Editor / Basics
                                </Typography>
                            </div>
                            <div className='flex justify-between gap-[2rem] items-center w-fit'>
                                <Typography
                                    sx={{
                                        color: '#2F3645',
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        userSelect: 'none',
                                        width: 'fit-content',
                                    }}
                                >
                                    Have you finished?
                                </Typography>
                                <Button sx={{
                                    borderRadius: '0.4rem',
                                    backgroundColor: '#1BAA64',
                                    color: '#F5F7F8 !important',
                                    '&:hover': {
                                        backgroundColor: '#148A4F',
                                        color: '#F5F7F8 !important',
                                    },
                                    textTransform: 'none',
                                    px: '2rem',
                                    fontSize: '1rem',
                                    width: 'fit-content',
                                    fontWeight: '600'
                                }}>
                                    Save changes
                                </Button>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default UpdateFundingProjectLayout;
