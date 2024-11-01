import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import homeLogo from "../../assets/images/logo-alt.png";
import defaultLogo from "../../assets/images/logo-text.png";
import { useCart } from '../../contexts/CartContext';
import cartApiInstace from "../../utils/ApiInstance/cartApiInstance";
import userApiInstace from "../../utils/ApiInstance/userApiInstance";
import CartDrawer from "../CartDrawer";
import AuthDialog from "../Popup";

const FunFundingAppBar = () => {
  const { cartItems, cartCount, setCartItems, setCartCount } = useCart();

  const pages = [
    { label: "Home", route: "/home", index: 0 },
    { label: "Crowdfunding", route: "/crowdfunding", index: 1 },
    { label: "About Us", route: "/about-us", index: 2 },
    { label: "Marketplace", route: "/marketplace", index: 3 },
  ];

  const profileMenu = [
    {
      label: "Account",
      route: "/account/profile",
      icon: <AccountCircleIcon />,
    },
    {
      label: "My wallet",
      route: "/account/wallet",
      icon: <AccountBalanceWalletIcon />,
    },
    { label: "Logout", route: "logout", icon: <LogoutIcon /> },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const isLogined = Cookies.get("_auth") !== undefined;
  const token = Cookies.get("_auth");

  const [name, setName] = useState("");

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    if (isLogined) {
      fetchUser();
    }
  }, [isLogined]);

  useEffect(() => {
    if (isLogined) {
      fetchCartCount();
    }
  }, [isLogined, cartCount]);

  useEffect(() => {
    const activePage = pages.find((page) => page.route === location.pathname);
    if (activePage) {
      setTabValue(activePage.index);
    } else {
      setTabValue(false);
    }
  }, [location.pathname]);

  const fetchUser = async () => {
    try {
      const res = await userApiInstace.get("/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data._statusCode == 200) {
        const user = res.data._data;
        setName(user.fullName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await cartApiInstace.get("/quantity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data._statusCode == 200) {
        setCartCount(res.data._data);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
  const signOut = useSignOut();
  const handleProfileMenuClick = (route) => {
    if (route === "logout") {
      Swal.fire({
        title: "Warning?",
        text: "Do You Want To Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FBB03B",
        cancelButtonColor: "D8D8D8",
        confirmButtonText: "Yes!",
        cancelButtonText: "No!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          signOut();
          window.location.href = "/home";
        }
      });
    } else {
      navigate(route);
    }
    handleCloseProfileMenu();
  };

  const handleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  const isPage =
    location.pathname === "/home" ||
    location.pathname === "/choose-project-plan";
  const appBarStyles = {
    background: isPage ? "transparent" : "#F5F7F8",
    boxShadow: "none",
    height: "5rem",
    justifyContent: "center",
    display: "flex",
    px: "4rem",
  };

  const tabStyles = {
    fontWeight: "900 !important",
    fontSize: "1rem",
    textTransform: "none",
    color: isPage ? "#F5F7F8" : "#2F3645",
    "&.Mui-selected": {
      color: "#1BAA64 !important",
    },
    mr: 2,
    "&:hover": {
      color: "#1BAA64",
      transition: "all 0.3s ease-in-out",
    },
    transition: "color 0.3s ease-in-out",
  };

  return (
    <div>
      <AppBar position="relative" sx={appBarStyles}>
        <Container maxWidth="false">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 4,
                display: { xs: "none", lg: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate('/home')}
            >
              <img
                src={isPage ? homeLogo : defaultLogo}
                style={{ height: "2.5rem" }}
                alt="Logo"
              />
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "5rem",
              }}
            >
              <Tabs
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#1BAA64",
                    height: "2.2px",
                  },
                }}
                value={tabValue}
                onChange={handleTabChange}
                sx={{ flexGrow: 1, display: "flex" }}
                error="false"
              >
                {pages.map((page, index) => (
                  <Tab
                    key={page.label}
                    label={page.label}
                    sx={{
                      ...tabStyles,
                      color: isPage
                        ? tabValue === index
                          ? "#1BAA64"
                          : "#F5F7F8"
                        : tabValue === index
                          ? "#1BAA64"
                          : "#2F3645",
                      fontWeight: "700 !important",
                    }}
                    error="false"
                  />
                ))}
              </Tabs>
            </Box>
            {isLogined ? (
              <Box
                sx={{ maxWidth: "100%", display: "flex", alignItems: "center" }}
              >
                <Badge
                  badgeContent={cartCount}
                  max={9}
                  showZero
                  sx={{
                    marginRight: "2rem",
                    "& .MuiBadge-badge": {
                      backgroundColor: "#1BAA64 !important",
                    },
                  }}
                >
                  <ShoppingCartIcon
                    fontSize="large"
                    sx={{
                      color: isPage ? "#F5F7F8" : "#2F3645",
                      transition: "color 0.3s",
                      "&:hover": { color: "#c5c9cb" },
                      cursor: "pointer",
                    }}
                    onClick={handleCartOpen}
                  />
                </Badge>
                <Badge
                  badgeContent={0}
                  max={99}
                  showZero
                  sx={{
                    marginRight: "2rem",
                    "& .MuiBadge-badge": {
                      backgroundColor: "#1BAA64 !important",
                    },
                  }}
                >
                  <NotificationsIcon
                    fontSize="large"
                    sx={{
                      cursor: "pointer",
                      transition: "color 0.3s",
                      "&:hover": { color: "#c5c9cb" },
                      color: isPage ? "#F5F7F8" : "#2F3645",
                    }}
                  />
                </Badge>
                <Tooltip title="Tài khoản">
                  <IconButton sx={{ p: 0 }} onClick={handleOpenProfileMenu}>
                    <Avatar alt="User" src={user?.userAvatarUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElProfile}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  open={Boolean(anchorElProfile)}
                  onClose={handleCloseProfileMenu}
                >
                  <MenuItem>
                    <Typography>{name}</Typography>
                  </MenuItem>
                  <Divider />
                  {profileMenu.map((menuItem) => (
                    <MenuItem
                      key={menuItem.label}
                      //onClick={() => navigate(menuItem.route)}
                      onClick={() => handleProfileMenuClick(menuItem.route)}
                    >
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText>{menuItem.label}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background: "#1BAA64",
                  fontWeight: "600",
                  textTransform: "none",
                  px: "3rem",
                  fontSize: "1.2rem",
                }}
                className="poiner-cursor"
                onClick={openAuthDialog}
              >
                Sign In
              </Button>
            )}
            <AuthDialog isOpen={isAuthDialogOpen} onClose={closeAuthDialog} />
          </Toolbar>
        </Container>
      </AppBar>
      <CartDrawer cartOpen={cartOpen} setCartOpen={handleCartOpen} cartCount={cartCount} fetchCartCount={fetchCartCount} />
    </div>
  );
};

export default FunFundingAppBar;
