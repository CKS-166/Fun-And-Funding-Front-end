import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaBookBookmark, FaFolderOpen, FaUserTie } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ktm from '../../../assets/images/ktm.jpg';
import Footer from '../../../components/Footer';
import './index.css';

function UserProfileLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const titleList = [
        { text: "Account", path: "/account/profile" },
        { text: "Projects", path: "/account/projects" },
        { text: "Bookmarks", path: "/account/bookmarks" },
        { text: "Orders", path: "/account/order" },
        { text: "Wallet", path: "/account/wallet" },
    ];

    const iconMapping = {
        0: <FaUserTie style={{ fontSize: '1.6rem' }} />,
        1: <FaFolderOpen style={{ fontSize: '1.6rem' }} />,
        2: <FaBookBookmark style={{ fontSize: '1.6rem' }} />,
        3: <FaClipboardList style={{ fontSize: '1.6rem' }} />,
        4: <IoMdWallet style={{ fontSize: '1.6rem' }} />,
    };
    const onClickMapping = {
        0: () => navigate("/account/profile"),
        1: () => navigate("/account/projects"),
        2: () => navigate("/account/bookmarks"),
        3: () => navigate("/account/bookmarks"),
        4: () => navigate("/account/wallet"),
    };
    return (
        <div className='mt-[2rem]'>
            <div className='mx-[5.5rem]'>
                <Grid2 container columnSpacing={'4rem'}>
                    <Grid2 size={3.5}>
                        <Paper elevation={3}
                            sx={{
                                zIndex: 1,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                alignItems: 'center',
                                position: 'sticky', top: '4.8rem',
                                backgroundColor: '#F5F7F8'
                            }}>
                            <div className='flex w-full flex-col justify-center items-center'>
                                <div className='h-[8rem] w-full bg-[#1BAA64]'></div>
                                <div className='rounded-full bg-[#F5F7F8] w-[11.6rem] h-[11.6rem] flex justify-center items-center mt-[-4.8rem] relative'>
                                    {true ? (
                                        <Avatar
                                            alt="User"
                                            src={ktm || ''}
                                            sx={{ width: "10rem", height: "10rem" }}
                                        />
                                    ) : (
                                        <Avatar
                                            alt="User"
                                            src={''}
                                            sx={{ width: "10rem", height: "10rem" }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 12
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                                                color: '#2F3645',
                                                '&:hover': {
                                                    backgroundColor: '#1BAA64',
                                                    color: 'white',
                                                    transition: 'all 0.3s',
                                                }
                                            }}>
                                            <CameraAltIcon />
                                        </Avatar>
                                    </div>
                                </div>
                            </div>
                            {true ?
                                <div className="flex flex-col justify-center items-center overflow-hidden mx-[2rem]">
                                    <h1 className="text-[1.4rem] text-[#2F3645] font-bold leading-relaxed my-[0.4rem]">
                                        Do Yoo Lim
                                    </h1>
                                </div>
                                : null
                            }
                            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <List sx={{ mx: '2.4rem', flexGrow: 1, mb: '1.2rem', mt: '0.8rem' }}>
                                    {titleList.map((item, index) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <ListItem key={item.text} onClick={onClickMapping[index]} sx={{ p: 0, mb: '0.8rem', borderRadius: '0.4rem' }}>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: '0.4rem',
                                                        backgroundColor: isActive ? '#1BAA64' : 'transparent',
                                                        color: isActive ? '#F5F7F8' : '#2F3645',
                                                        '&:hover': {
                                                            // backgroundColor: '#1BAA64',
                                                            // color: '#F5F7F8 !important',
                                                            // '& .MuiListItemIcon-root': {
                                                            //     color: '#F5F7F8',
                                                            // },
                                                            boxShadow: 'inset 0 0 0 1px #1BAA64',
                                                            backgroundColor: '#F5F7F8',
                                                            color: '#1BAA64 !important',
                                                            '& .MuiListItemIcon-root': {
                                                                color: '#1BAA64',
                                                            },
                                                        }
                                                    }}
                                                >
                                                    <ListItemIcon sx={{
                                                        color: isActive ? '#F5F7F8' : '#2F3645', '&:hover': {
                                                            color: '#F5F7F8',
                                                        },
                                                    }}>
                                                        {iconMapping[index]}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.text}
                                                        primaryTypographyProps={{ fontSize: '1rem', fontWeight: '600' }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Paper>
                    </Grid2>
                    <Grid2 size={8.5}>
                        <Outlet />
                    </Grid2>
                </Grid2>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfileLayout;
