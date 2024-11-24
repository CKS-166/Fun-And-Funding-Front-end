import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Paper, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { FaSliders } from "react-icons/fa6";
import SearchBar from '../../components/SearchBar';
import SortDropdown from '../../components/SortDropdown';
import OwnerProjectCard from '../../components/UserProjectCard/OwnerProjectCard';
import PublicProjectCard from '../../components/UserProjectCard/PublicProjectCard';
import { useLoading } from "../../contexts/LoadingContext";
import fundingProjectApiInstance from "../../utils/ApiInstance/fundingProjectApiInstance";
import userApiInstance from "../../utils/ApiInstance/userApiInstance";

function AccountProject() {
    const { isLoading, setIsLoading } = useLoading();
    const token = Cookies.get("_auth");
    const [user, setUser] = useState({});
    const [role, setRole] = useState("Backer");
    const [gameOwnerProject, setGameOwnerProject] = useState([]);
    const [backerDonationProject, setBackerDonationProject] = useState([]);
    const [searchOwnerProject, setSearchOwnerProject] = useState('');
    const [searchDonationProject, setSearchDonationProject] = useState('');
    const [selectedSortOptions, setSelectedSortOptions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchUser();
        fetchGameOwnerProject();
        fetchBackerDonationProject();
        setIsLoading(false);
    }, [token]);

    useEffect(() => {
        setIsLoading(true);
        fetchGameOwnerProject(searchOwnerProject);
        setIsLoading(false);
    }, [searchOwnerProject]);

    useEffect(() => {
        setIsLoading(true);
        fetchBackerDonationProject(searchDonationProject);
        setIsLoading(false);
    }, [searchDonationProject]);

    const handleOwnerProjectSearchChange = (value) => {
        setSearchOwnerProject(value);
    };

    const handleDonationProjectSearchChange = (value) => {
        setSearchDonationProject(value);
    };

    const sortOptions = [
        'Draft',
        'Funding',
        'Marketing',
    ];
    const handleSortChange = (values) => {
        setSelectedSortOptions(values);
    };

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const res = await userApiInstance.get(`/info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data._statusCode == 200) {
                setUser(res.data._data);
                fetchUserRole(res.data._data.id);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserRole = async (id) => {
        try {
            const res = await userApiInstance.get(`user-role/${id}`);
            if (res.data._statusCode == 200) {
                setRole(res.data._data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGameOwnerProject = async (searchOwnerProject) => {
        try {
            const res = await fundingProjectApiInstance.get(`/game-owner-projects`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize: 999999,
                    pageIndex: 1,
                }
            });
            if (res.data._statusCode == 200) {
                console.log(res.data._data.items);
                setGameOwnerProject(res.data._data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBackerDonationProject = async (searchDonationProject) => {
        try {
            const res = await fundingProjectApiInstance.get(`/backer-donation-projects`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize: 999999,
                    pageIndex: 1,
                }
            });
            if (res.data._statusCode == 200) {
                setBackerDonationProject(res.data._data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {role == "GameOwner" &&
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
            }
            {role == "GameOwner" ? <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', mb: '2rem', pb: '1rem' }}>
                <div className='py-[1.5rem] mx-[1rem]'>
                    <Typography sx={{ fontWeight: '700', fontSize: '1.25rem', mb: '2rem' }}>Your funding Project</Typography>
                    <div className='flex flex-row justify-between gap-[1rem] mb-[2rem]'>
                        <SearchBar onSearchChange={handleOwnerProjectSearchChange} />
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
                    {gameOwnerProject != null && gameOwnerProject.length > 0 ? gameOwnerProject.map((project, index) => (
                        <div key={index}>
                            <OwnerProjectCard project={project} projectType={"Funding"} />
                            {index !== gameOwnerProject.length - 1 && (
                                <Divider sx={{ my: '1.5rem' }} />
                            )}
                        </div>
                    )) : <Typography>Nothing to show</Typography>}
                </div>
            </Paper> : <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', pb: '1rem', mb: '2rem' }}>
                <div className='py-[1.5rem] mx-[1rem]'>
                    <Typography sx={{ fontWeight: '700', fontSize: '1.25rem', mb: '2rem' }}>All donated funding projects</Typography>
                    <div className='flex flex-row justify-between gap-[1rem] mb-[2rem]'>
                        <SearchBar onSearchChange={handleDonationProjectSearchChange} />
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
                    {backerDonationProject != null && backerDonationProject.length > 0 ?
                        backerDonationProject.map((project, index) => (
                            <div key={index}>
                                <PublicProjectCard project={project} projectType={"Funding"} />
                                {index !== backerDonationProject.length - 1 && (
                                    <Divider sx={{ my: '1.5rem' }} />
                                )}
                            </div>
                        )) : <Typography>Nothing to show</Typography>}
                </div>
            </Paper>}
        </div>
    )
}

export default AccountProject