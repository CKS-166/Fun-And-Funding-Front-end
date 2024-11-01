import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import SellIcon from '@mui/icons-material/Sell';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {
    Button, Checkbox,
    Divider, Grid2,
    Paper,
    Typography
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import Background from "../../assets/images/background-pattern.png";
import BrowseMarketingCard from "../../components/BrowseMarketingCard";
import CheckoutGameTable from "../../components/CheckoutCart/CheckoutGameTable";
import { useCart } from '../../contexts/CartContext';
import cartApiInstance from "../../utils/ApiInstance/cartApiInstance";
import orderApiInstace from "../../utils/ApiInstance/orderApiInstance";
import userApiInstance from "../../utils/ApiInstance/userApiInstance";
import './index.css';

function CheckoutCart() {
    const { cartItems, cartCount, order, setCartItems, setCartCount, setOrder } = useCart();
    const token = Cookies.get("_auth");
    const isLogined = Cookies.get("_auth") !== undefined;

    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [paymentPrice, setPaymentPrice] = useState(0);
    const [checked, isChecked] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        if (isLogined) {
            fetchCartItems();
            handleGetWalletBalance();
        }
    }, [token]);

    useEffect(() => {
        getPaymentPrice();
    }, [totalPrice, discountPrice, order]);

    useEffect(() => {
        getPriceTotal(order);
        getDiscountPrice(order);
    }, [order]);

    useEffect(() => {
        checkEnableButton();
    }, [checked, walletBalance, paymentPrice, order]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    const fetchCartItems = async () => {
        try {
            const res = await cartApiInstance.get("", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                setCartItems(res.data._data.items);
                applyCartToOrder(res.data._data.items);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCartCount = async () => {
        try {
            const res = await cartApiInstance.get("/quantity", {
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

    const handleDeleteCartItem = async (marketplaceProjectId) => {
        try {
            const res = await cartApiInstance.delete(`${marketplaceProjectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                fetchCartCount();
                fetchCartItems();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const applyCartToOrder = async (cartItems) => {
        try {
            const newOrderItems = cartItems.map(item => ({
                marketplaceProjectId: item.marketplaceProject.id,
                price: item.marketplaceProject.price,
                marketplaceProject: item.marketplaceProject,
                discountedPrice: item.marketplaceProject.discountedPrice || item.marketplaceProject.price,
                appliedCoupon: {
                    id: item.appliedCoupon?.id || "",
                    couponKey: item.appliedCoupon?.couponKey || "",
                    discountRate: item.appliedCoupon?.discountRate || 0,
                    quantity: item.appliedCoupon?.quantity || 0
                },
                createdDate: item.createdDate
            }));
            console.log(newOrderItems);
            setOrder([{ cartItems: newOrderItems }]);
        } catch (err) {
            console.log("Error applying cart to order:", err);
        }
    };

    const getPriceTotal = (order) => {
        const total = order[0]?.cartItems?.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }

    const getDiscountPrice = (order) => {
        const discountTotal = order[0]?.cartItems?.reduce((sum, item) => sum + (item.price - item.discountedPrice), 0);
        setDiscountPrice(discountTotal);
    };

    const getPaymentPrice = () => {
        setPaymentPrice(totalPrice - discountPrice);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleCheckbox = (event) => {
        isChecked(event.target.checked);
    };

    const handleGetWalletBalance = async () => {
        try {
            const res = await userApiInstance.get(`/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                setWalletBalance(res.data._data.wallet.balance)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddCoupon = (marketplaceProjectId, newCoupon) => {
        const status = { code: 200, message: "Coupon applied successfully" };

        setOrder((prevOrder) =>
            prevOrder.map((orderItem) => {
                if (orderItem.cartItems) {
                    return {
                        ...orderItem,
                        cartItems: orderItem.cartItems.map((item) => {
                            if (item.marketplaceProjectId === marketplaceProjectId) {
                                if (item.appliedCoupon != null && item.appliedCoupon.couponKey !== "") {
                                    status.code = 400;
                                    status.message = "Coupon already applied";
                                } else {
                                    item.appliedCoupon.couponKey = newCoupon;
                                    item.appliedCoupon.discountRate = 0.5 * 100
                                    item.discountedPrice = item.price * 0.5;
                                }
                            }
                            return item;
                        })
                    };
                }
                return orderItem;
            })
        );

        return status;
    };

    const handleRemoveCoupon = (marketplaceProjectId) => {
        setOrder((prevOrder) =>
            prevOrder.map((orderItem) => {
                if (orderItem.cartItems) {
                    return {
                        ...orderItem,
                        cartItems: orderItem.cartItems.map((item) => {
                            if (item.marketplaceProjectId === marketplaceProjectId) {
                                item.appliedCoupon = {
                                    id: "",
                                    couponKey: "",
                                    discountRate: 0,
                                    quantity: ""
                                };
                                item.discountedPrice = item.price;
                            }
                            return item;
                        })
                    };
                }
                return orderItem;
            })
        );
    };

    const handleCreateOrder = async () => {
        const flattenedOrder = {
            cartItems: order[0].cartItems
        };
        try {
            const res = await orderApiInstace.post(``, flattenedOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                console.log(res.data._data);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const checkEnableButton = () => {
        if (!checked) return false;
        if (paymentPrice > walletBalance) return false;
        const hasValidCartItem = order[0]?.cartItems?.some(item => item.marketplaceProjectId !== "");

        return hasValidCartItem;
    };

    return (
        <div>
            <div className='h-[8rem] text-white flex justify-center items-center py-10 bg-[var(--black)] font-semibold text-2xl font1 relative'>
                <div className="checkout-cart-banner-background">
                    <img
                        src={Background}
                        alt="footer"
                        border="0"
                        style={{ height: "8rem", objectFit: "cover", width: "100%" }}
                    />
                    <div className="checkout-cart-banner-overlay"></div>
                </div>
                <Typography className="checkout-cart-banner-content">
                    Order Checkout
                </Typography>
            </div>
            <div className="mx-[var(--side-margin)]">
                <Grid2 container columnSpacing="4rem" sx={{ width: '100%', mb: '4rem', mt: '3rem' }}>
                    <Grid2 size={8} sx={{ flexGrow: 1 }}>
                        <Typography className="checkout-cart-title">
                            Checkout cart
                        </Typography>
                        <CheckoutGameTable order={order} handleDeleteCartItem={handleDeleteCartItem} handleAddCoupon={handleAddCoupon} handleRemoveCoupon={handleRemoveCoupon} />
                    </Grid2>
                    <Grid2 size={4} sx={{ flexGrow: 1, position: "sticky", top: '2rem', zIndex: 10, alignSelf: 'flex-start' }}>
                        <Typography className='checkout-cart-title'>
                            Summary
                        </Typography>
                        <Paper elevation={3} className="checkout-cart-paper !mb-[2rem]">
                            <Typography className='checkout-cart-subtitle !mb-[1.5rem]'>
                                Order Details
                            </Typography>
                            <div className="flex justify-between items-center mb-[1rem]">
                                <Typography className='checkout-cart-row-title'>
                                    Total items:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                    }}
                                >
                                    <SportsEsportsIcon className='checkout-cart-icon'></SportsEsportsIcon>{cartCount}
                                </Typography>
                            </div>
                            <div className="flex justify-between items-center mb-[1rem]">
                                <Typography className='checkout-cart-row-title'>
                                    Order Date:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                    }}
                                >
                                    {getCurrentDate()}
                                </Typography>
                            </div>
                            <div className="flex justify-between items-center mb-[1rem]">
                                <Typography className='checkout-cart-row-title'>
                                    Order Price:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                    }}
                                >
                                    {formatPrice(totalPrice)} VND
                                </Typography>
                            </div>
                            <div className="flex justify-between items-center">
                                <Typography className='checkout-cart-row-title'>
                                    Discounted Price:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                    }}
                                >
                                    {formatPrice(discountPrice)} VND
                                </Typography>
                            </div>
                            <Divider orientation="horizontal" sx={{ borderColor: '#DBDBDB', my: '1.5rem' }} />
                            <div className="flex justify-between items-center mb-[1rem]">
                                <Typography className='checkout-cart-subtitle'>
                                    Total:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                    }}
                                >
                                    <SellIcon className='checkout-cart-icon'></SellIcon> {formatPrice(paymentPrice)} VND
                                </Typography>
                            </div>
                            <div className="flex justify-between items-center">
                                <Typography className='checkout-cart-row-title'>
                                    Wallet balance:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        color: paymentPrice > walletBalance ? "var(--red)" : "var(--primary-green)",
                                        textAlign: "left",
                                    }}
                                >
                                    {formatPrice(walletBalance)} VND
                                </Typography>
                            </div>
                        </Paper>
                        <Paper elevation={3} className="checkout-cart-paper">
                            <div className='flex items-start justify-start mb-[1rem]'>
                                <Checkbox checked={checked} onChange={handleCheckbox} sx={{
                                    mr: '0.5rem', transition: 'all 0.3s ease-in-out', '&.Mui-checked': {
                                        color: 'var(--primary-green)',
                                    },
                                }} />
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "0.875rem",
                                        color: "var(--black)",
                                        textAlign: "left",
                                        alignSelf: 'flex-start',
                                    }}
                                >
                                    By clicking this, I agree to Fun&Funding <a
                                        href="/terms-and-conditions"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1BAA64', textDecoration: 'none', fontWeight: '600' }}
                                    >
                                        Terms and Conditions
                                    </a>.
                                </Typography>
                            </div>
                            <Button
                                variant='contained'
                                className='checkout-cart-confirm-button'
                                disabled={!checkEnableButton()}
                                onClick={() => handleCreateOrder()}
                            >
                                Pay for my order
                            </Button>
                        </Paper>
                    </Grid2>
                </Grid2>
                <div>
                    <Typography className='checkout-cart-title'>
                        Recommended games
                    </Typography>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row justify-between items-center w-full">
                            <BrowseMarketingCard />
                            <BrowseMarketingCard />
                            <BrowseMarketingCard />
                            <BrowseMarketingCard />
                        </div>
                        <Button
                            variant="contained"
                            className='checkout-cart-more-button'
                            endIcon={
                                <ArrowForwardOutlinedIcon
                                    sx={{
                                        fontSize: "1.5rem !important",
                                        strokeWidth: "1",
                                        stroke: "#F5F7F8",
                                    }}
                                />
                            }
                        >
                            See more games
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCart