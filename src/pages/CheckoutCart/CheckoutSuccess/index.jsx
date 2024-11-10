import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Divider, Paper, Tooltip, Typography } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Confetti from "../../../assets/images/confetti-background.png";
import BrowseMarketingCard from "../../../components/BrowseMarketingCard";
import orderApiInstance from "../../../utils/ApiInstance/orderApiInstance";
import './index.css';

const AnimatedCheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="160"
            height="160"
            className="check-icon"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                fill="var(--primary-green)"
                strokeWidth="2"
                className="circle"
            />
            <path
                d="M8 13l3 3 5-7"
                fill="none"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="checkmark"
            />
        </svg>
    );
};

function CheckoutSuccess() {
    const { id } = useParams();
    const token = Cookies.get("_auth");
    const isLogined = Cookies.get("_auth") !== undefined;
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [detailList, setDetailList] = useState([]);

    useEffect(() => {
        if (isLogined) {
            fetchOrder();
        }
    }, [isLogined, id]);

    const fetchOrder = async () => {
        try {
            const res = await orderApiInstance.get(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode === 200) {
                const fetchedOrder = res.data._data;
                setOrder(fetchedOrder);

                const fetchedDetails = fetchedOrder.orderDetails.map((item) => ({
                    id: item.digitalKey.id,
                    imageUrl: item.digitalKey.marketingProject?.marketplaceFiles.find(file => file.fileType === 2)?.url || '',
                    name: item.digitalKey.marketingProject?.name || 'Unnamed Game',
                    keyString: item.digitalKey?.keyString || 'No Key',
                    price: item.unitPrice,
                    gameFile: item.digitalKey.marketingProject?.marketplaceFiles.find(file => file.fileType === 3)?.url || '',
                }));
                setDetailList(fetchedDetails);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('de-DE').format(price);
    };

    return (
        <div>
            <div className='relative-container'>
                <div className="success-background">
                    <img src={Confetti} alt="Confetti Background" />
                    <div className="success-overlay"></div>
                </div>
                <div className="flex flex-col justify-center items-center z-10">
                    <AnimatedCheckIcon />
                    <Typography className='checkout-success-title !mt-[1rem]'>
                        Thank You For Your Purchase!
                    </Typography>
                    <Typography>
                        Thank you for trusting us and our community. We are glad to serve you on our journey.
                    </Typography>
                    {order != null &&
                        <div className="mt-[2rem] mb-[1rem] w-fit">
                            <Paper elevation={3} className="checkout-success-paper">
                                <div className="border-[2px] border-[var(--primary-green)] px-[2rem] py-[1rem] flex flex-row justify-start items-center rounded-[0.625rem] gap-[2.5rem] w-[40rem]"
                                    style={{ backgroundColor: 'rgba(27, 170, 100, 0.1)' }}>
                                    <div className="flex-shrink-0">
                                        <FaMoneyBillTransfer style={{ fontSize: '4rem', color: 'var(--black)' }} />
                                    </div>
                                    <div className="flex-shrink-0 flex flex-col justify-start gap-[0.5rem]">
                                        <Typography sx={{ fontSize: '1rem', fontWeight: '400', color: 'var(--black)' }}>
                                            Total amount
                                        </Typography>
                                        <Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--black)' }}>
                                            {formatPrice(order.totalPrice)} VND
                                        </Typography>
                                    </div>
                                </div>
                                <Divider orientation="horizontal" sx={{ borderColor: '#DBDBDB', my: '1.5rem' }} />
                                <div
                                    className="overflow-hidden"
                                    style={{
                                        maxHeight: `calc(2.5 * (7rem + 3.5rem))`,
                                        height: 'fit-content',
                                        overflowY: 'scroll',
                                        scrollbarWidth: 'none',
                                        WebkitOverflowScrolling: 'touch',
                                    }}
                                >
                                    <div className="hide-scrollbar">
                                        {detailList.length > 0 &&
                                            detailList.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="border-[2px] border-[var(--grey)] pl-[1rem] pr-[2rem] py-[1rem] flex flex-row justify-between items-center rounded-[0.625rem] gap-[4rem] w-[40rem]"
                                                    style={{
                                                        backgroundColor: 'var(--white)',
                                                        marginBottom: index === detailList.length - 1 ? 0 : '1rem',
                                                    }}
                                                >
                                                    <div className="!flex-grow-0 flex flex-row justify-between items-center rounded-[0.625rem] gap-[0.5rem] w-[25rem]">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="w-[8rem] h-[8rem] object-cover rounded-[0.25rem] flex-shrink-0"
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div className="flex-shrink-0 flex justify-between">
                                                            <div className="flex flex-col justify-start gap-[0.5rem] flex-grow-0 flex-shrink-0">
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: '700',
                                                                        color: 'var(--black)',
                                                                        display: '-webkit-box',
                                                                        WebkitBoxOrient: 'vertical',
                                                                        WebkitLineClamp: 1,
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'normal',
                                                                        maxWidth: '15rem',
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1rem',
                                                                        fontWeight: '600',
                                                                        color: 'var(--primary-green)',
                                                                    }}
                                                                >
                                                                    {formatPrice(item.price)} VND
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1rem',
                                                                        fontWeight: '400',
                                                                        color: 'var(--black)',
                                                                    }}
                                                                >
                                                                    Game unlock key: <br /><span className="font-bold">{item.keyString}</span>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Tooltip title="Download game file" arrow>
                                                        <Button
                                                            variant="outlined"
                                                            className="outline-download-button"
                                                        >
                                                            <DownloadIcon
                                                                sx={{
                                                                    fontSize: "2rem !important",
                                                                    strokeWidth: "1",
                                                                    stroke: "#F5F7F8",
                                                                }}
                                                            />
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    }
                    <div className="flex flex-row justify-center items-center gap-[2rem] mb-[2rem]">
                        <Button
                            variant="outlined"
                            className="outline-button"
                            startIcon={
                                <HiOutlineHome
                                    sx={{
                                        fontSize: "1.5rem !important",
                                        strokeWidth: "1",
                                        stroke: "#F5F7F8",
                                    }}
                                />
                            }
                            onClick={() => navigate('/home')}
                        >
                            Back to Home
                        </Button>
                        <Button
                            variant="contained"
                            className='checkout-success-button'
                            startIcon={
                                <TbListDetails
                                    sx={{
                                        fontSize: "1.5rem !important",
                                        strokeWidth: "1",
                                        stroke: "#F5F7F8",
                                    }}
                                />
                            }
                            onClick={() => navigate('/home')}
                        >
                            See more details
                        </Button>
                    </div>
                </div>
            </div >

            <div className='recommended-section'>
                <Typography className='checkout-cart-title !pb-[1rem]'>
                    Recommended games
                </Typography>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row justify-between items-center w-full mb-[1rem]">
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
        </div >
    );
}

export default CheckoutSuccess;