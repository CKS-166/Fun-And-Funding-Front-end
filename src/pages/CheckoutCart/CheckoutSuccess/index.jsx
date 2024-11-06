import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Button, Divider, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import Confetti from "../../../assets/images/confetti-background.png";
import ktm from '../../../assets/images/ktm.jpg';
import BrowseMarketingCard from "../../../components/BrowseMarketingCard";
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
    const [detailList, setDetailList] = useState([
        {
            id: 1,
            imageUrl: ktm,
            name: "Product 1 aaaa aaaaaaa aaa a a aa aaaaaaaa aaaaaaaaa aaaaaa",
            price: "100.000 VND",
        },
        {
            id: 2,
            imageUrl: ktm,
            name: "Product 2",
            price: "200.000 VND",
        },
        {
            id: 3,
            imageUrl: ktm,
            name: "Product 3",
            price: "200.000 VND",
        },
        {
            id: 4,
            imageUrl: ktm,
            name: "Product 4",
            price: "200.000 VND",
        },
    ]);

    return (
        <div>
            <div className='relative-container'>
                <div className="success-background">
                    <img
                        src={Confetti}
                        alt="Confetti Background"
                    />
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
                    <div className="my-[2rem] w-fit">
                        <Paper elevation={3} className="checkout-success-paper">
                            <div className="border-[2px] border-[var(--primary-green)] px-[2rem] py-[1rem] flex flex-row justify-start items-center rounded-[0.625rem] gap-[2.5rem] w-[26rem]"
                                style={{ backgroundColor: 'rgba(27, 170, 100, 0.1)' }}>
                                <div className="flex-shrink-0">
                                    <FaMoneyBillTransfer style={{ fontSize: '4rem', color: 'var(--black)' }} />
                                </div>
                                <div className="flex-shrink-0 flex flex-col justify-start gap-[0.5rem]">
                                    <Typography sx={{ fontSize: '1rem', fontWeight: '400', color: 'var(--black)' }}>
                                        Total amount
                                    </Typography>
                                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--black)' }}>
                                        140.000 VND
                                    </Typography>
                                </div>
                            </div>
                            <Divider orientation="horizontal" sx={{ borderColor: '#DBDBDB', my: '1.5rem' }} />
                            <div
                                className="overflow-hidden"
                                style={{
                                    height: `calc(2.5 * (5rem + 2rem))`,
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'none',
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                <div
                                    className="hide-scrollbar"
                                >
                                    {detailList != null &&
                                        detailList.length > 0 &&
                                        detailList.map((item, index) => (
                                            <div
                                                key={index}
                                                className="border-[2px] border-[var(--grey)] pl-[1rem] pr-[2rem] py-[1rem] flex flex-row justify-start items-center rounded-[0.625rem] gap-[1rem] w-[26rem]"
                                                style={{
                                                    backgroundColor: 'var(--white)',
                                                    marginBottom: index === detailList.length - 1 ? 0 : '1rem',
                                                }}
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-[5rem] h-[5rem] object-cover rounded-[0.25rem] flex-shrink-0 mr-[1rem]"
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div className="flex-shrink-0 flex flex-col justify-start gap-[0.5rem]">
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: '600',
                                                            color: 'var(--black)',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'normal',
                                                            width: '16rem',
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: '400',
                                                            color: 'var(--black)',
                                                        }}
                                                    >
                                                        {item.price}
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[2rem]">
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
                        >
                            See more details
                        </Button>
                    </div>
                </div>
            </div>

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
        </div>
    );
}

export default CheckoutSuccess;