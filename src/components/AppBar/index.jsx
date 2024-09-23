import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Badge, Box, Button, Container, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import homeLogo from "../../assets/logo-alt.png";
import defaultLogo from "../../assets/logo.png";

const FunFundingAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { label: 'Home', route: '/home', index: 0 },
    { label: 'Crowdfunding', route: '/crowdfunding', index: 1 },
    { label: 'About Us', route: '/about-us', index: 2 },
    { label: 'Marketplace', route: '/marketplace', index: 3 }
  ];

  const profileMenu = [
    { label: 'Tài khoản', route: '/profile', icon: <AccountCircleIcon /> },
    { label: 'Ví của tôi', route: '/my-wallet', icon: <AccountBalanceWalletIcon /> },
    { label: 'Dự án của tôi', route: '/profile/projects', icon: <BallotIcon /> },
    { label: 'Đăng xuất', route: 'logout', icon: <LogoutIcon /> }
  ];

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const activePage = pages.find(page => page.route === location.pathname);
    if (activePage) {
      setTabValue(activePage.index);
    } else {
      setTabValue(-1);
    }
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(pages[newValue].route);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const isHomePage = location.pathname === '/home';
  const appBarStyles = {
    background: isHomePage ? 'transparent' : '#F5F7F8',
    boxShadow: 'none',
    height: '6.4rem',
    justifyContent: 'center',
    display: 'flex',
    px: '4rem', //padding for AppBar
  };

  const tabStyles = {
    fontWeight: '900 !important',
    fontSize: '1.1rem',
    textTransform: 'none',
    color: isHomePage ? '#F5F7F8' : '#2F3645',
    '&.Mui-selected': {
      color: '#1BAA64 !important',
    },
    mr: 2,
    '&:hover': {
      color: '#1BAA64',
      transition: 'all 0.3s ease-in-out',
    },
    transition: 'color 0.3s ease-in-out',
  };

  return (
    <AppBar position='absolute' sx={appBarStyles}>
      <Container maxWidth="false">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="a" sx={{ mr: 4, display: { xs: 'none', lg: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', alignItems: 'center', cursor: 'pointer' }}>
            <img src={isHomePage ? homeLogo : defaultLogo} style={{ height: '3.2rem' }} alt="Logo" />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem' }}>
            <Tabs
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#1BAA64",
                  height: '2.2px',
                },
              }}
              value={tabValue}
              onChange={handleTabChange}
              sx={{ flexGrow: 1, display: 'flex' }}
            >
              {pages.map((page, index) => (
                <Tab
                  key={page.label}
                  label={page.label}
                  sx={{
                    ...tabStyles,
                    color: isHomePage ? (tabValue === index ? '#1BAA64' : '#F5F7F8') : (tabValue === index ? '#1BAA64' : '#2F3645'),
                    fontWeight: '700 !important',
                  }}
                />
              ))}
            </Tabs>
          </Box>
          {user ? (
            <Box sx={{ maxWidth: '100%', mr: { xs: '16px', lg: '6rem' }, display: 'flex', alignItems: 'center' }}>
              <Badge badgeContent={0} max={99} showZero sx={{ marginRight: '32px', "& .MuiBadge-badge": { backgroundColor: '#FBB03B !important' } }}>
                <NotificationsIcon fontSize='large' sx={{ color: '#44494D', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#FBB03B' } }} />
              </Badge>
              <Tooltip title="Tài khoản">
                <IconButton sx={{ p: 0, mr: '16px' }} onClick={handleOpenProfileMenu}>
                  <Avatar alt="User" src={user?.userAvatarUrl} />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElProfile} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }} open={Boolean(anchorElProfile)} onClose={handleCloseProfileMenu}>
                <MenuItem>
                  <Typography>{user?.accountName}</Typography>
                  <Typography>{user?.userEmail}</Typography>
                </MenuItem>
                <Divider />
                {profileMenu.map((menuItem) => (
                  <MenuItem key={menuItem.label} onClick={() => navigate(menuItem.route)}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText>{menuItem.label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button variant="contained" sx={{ background: "#1BAA64", fontWeight: "600", textTransform: "none", px: '3rem', fontSize: '1.2rem' }}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FunFundingAppBar;
