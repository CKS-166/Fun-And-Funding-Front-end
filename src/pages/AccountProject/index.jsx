import { Button, Divider, Paper, Typography } from '@mui/material';
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
import marketplaceProjectApiInstance from "../../utils/ApiInstance/marketplaceProjectApiInstance";
import userApiInstance from "../../utils/ApiInstance/userApiInstance";

function AccountProject() {
    const { isLoading, setIsLoading } = useLoading();
    const token = Cookies.get("_auth");
    const [user, setUser] = useState({});
    const [role, setRole] = useState("Backer");
    const [gameOwnerFundingProject, setGameOwnerFundingProject] = useState([]);
    const [gameOwnerMarketplaceProject, setGameOwnerMarketplaceProject] = useState([]);
    const [backerDonationProject, setBackerDonationProject] = useState([]);
    const [backerPurchaseProject, setBackerPurchaseProject] = useState([]);
    const [searchOwnerFundingProject, setSearchOwnerFundingProject] = useState('');
    const [searchDonationProject, setSearchDonationProject] = useState('');
    const [searchOwnerMarketplaceProject, setSearchOwnerMarketplaceProject] = useState('');
    const [searchPurchaseProject, setSearchPurchaseProject] = useState('');
    const [selectedSortOptions, setSelectedSortOptions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchUser();
        fetchGameOwnerFundingProject();
        fetchBackerDonationProject();
        setIsLoading(false);
    }, [token]);

    useEffect(() => {
        setIsLoading(true);
        fetchGameOwnerFundingProject(searchOwnerFundingProject);
        setIsLoading(false);
    }, [searchOwnerFundingProject]);

    useEffect(() => {
        setIsLoading(true);
        fetchBackerDonationProject(searchDonationProject);
        setIsLoading(false);
    }, [searchDonationProject]);

    useEffect(() => {
        setIsLoading(true);
        fetchGameOwnerMarketplaceProject(searchOwnerMarketplaceProject);
        setIsLoading(false);
    }, [searchOwnerMarketplaceProject]);

    useEffect(() => {
        setIsLoading(true);
        fetchBackerPurchaseProject(searchPurchaseProject);
        setIsLoading(false);
    }, [searchPurchaseProject]);

    const handleOwnerProjectSearchChange = (value) => {
        setSearchOwnerFundingProject(value);
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

    const fetchGameOwnerFundingProject = async (searchOwnerFundingProject) => {
        try {
            const res = await fundingProjectApiInstance.get(`/game-owner-projects`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize: 999999,
                    pageIndex: 1,
                }
            });
            if (res.data._statusCode == 200) {
                setGameOwnerFundingProject(res.data._data.items);
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
                setBackerDonationProject(res.data._data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGameOwnerMarketplaceProject = async (searchOwnerMarketplaceProject) => {
        try {
            const res = await marketplaceProjectApiInstance.get(`/game-owner-projects`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize: 999999,
                    pageIndex: 1,
                }
            });
            if (res.data._statusCode == 200) {
                setGameOwnerMarketplaceProject(res.data._data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBackerPurchaseProject = async (searchPurchaseProject) => {
        try {
            const res = await marketplaceProjectApiInstance.get(`/backer-purchase-projects`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize: 999999,
                    pageIndex: 1,
                }
            });
            if (res.data._statusCode == 200) {
                console.log(res.data._data)
                setBackerPurchaseProject(res.data._data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pl-[4rem] pr-[5.5rem] mt-[2rem] mb-[4rem]">
            {role == "GameOwner" ? <>
                <div className='w-[100%] mb-[4rem]'>
                    <div className="flex justify-start gap-[1rem] items-start flex-col mb-[4rem]">
                        <h1 className="!text-[1.5rem] text-left font-bold text-[#2F3645]">
                            Your Funding Project
                        </h1>
                        <Typography
                            sx={{
                                color: '#2F3645',
                                fontSize: '1rem',
                                fontWeight: '400',
                                userSelect: 'none',
                                width: '85%',
                            }}
                        >
                            Manage and update your personal details, including your name, email, phone number, and other essential information to keep your account up to date.
                        </Typography>
                    </div>
                    <div className='flex flex-row justify-between gap-[1rem] mb-[2rem]'>
                        <SearchBar onSearchChange={handleOwnerProjectSearchChange} />
                        <SortDropdown options={sortOptions} onValueChange={handleSortChange} />
                    </div>
                    {gameOwnerFundingProject != null && gameOwnerFundingProject.length > 0 ? gameOwnerFundingProject.map((project, index) => (
                        <div key={index}>
                            <OwnerProjectCard project={project} projectType={"Funding"} />
                            {index !== gameOwnerFundingProject.length - 1 && (
                                <Divider sx={{ my: '1.5rem' }} />
                            )}
                        </div>
                    )) : <Typography>Nothing to show</Typography>}
                </div>
                <div className='w-[100%]'>
                    <div className="flex justify-start gap-[1rem] items-start flex-col mb-[4rem]">
                        <h1 className="!text-[1.5rem] text-left font-bold text-[#2F3645]">
                            Your Marketplace Project
                        </h1>
                        <Typography
                            sx={{
                                color: '#2F3645',
                                fontSize: '1rem',
                                fontWeight: '400',
                                userSelect: 'none',
                                width: '85%',
                            }}
                        >
                            Manage and update your personal details, including your name, email, phone number, and other essential information to keep your account up to date.
                        </Typography>
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
                        {gameOwnerMarketplaceProject != null && gameOwnerMarketplaceProject.length > 0 ? gameOwnerMarketplaceProject.map((project, index) => (
                            <div key={index}>
                                <OwnerProjectCard project={project} projectType={"Marketplace"} />
                                {index !== gameOwnerMarketplaceProject.length - 1 && (
                                    <Divider sx={{ my: '1.5rem' }} />
                                )}
                            </div>
                        )) : <Typography>Nothing to show</Typography>}
                    </div>
                </div>
            </> : <>
                <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', pb: '1rem', mb: '2rem' }}>
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
                </Paper>
                <Paper elevation={3} sx={{ borderRadius: '0.25rem !important', px: '1rem', height: 'fit-content', backgroundColor: '#F5F7F8', pb: '1rem', mb: '2rem' }}>
                    <div className='py-[1.5rem] mx-[1rem]'>
                        <Typography sx={{ fontWeight: '700', fontSize: '1.25rem', mb: '2rem' }}>All purchased marketplace projects</Typography>
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
                        {backerPurchaseProject != null && backerPurchaseProject.length > 0 ?
                            backerPurchaseProject.map((project, index) => (
                                <div key={index}>
                                    <PublicProjectCard project={project} projectType={"Marketplace"} />
                                    {index !== backerPurchaseProject.length - 1 && (
                                        <Divider sx={{ my: '1.5rem' }} />
                                    )}
                                </div>
                            )) : <Typography>Nothing to show</Typography>}
                    </div>
                </Paper>
            </>}
        </div>
    )
}

export default AccountProject