import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Backdrop, Box, Divider, Fade, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchBar from '../../SearchBar';
import SortDropdown from '../../SortDropdown';

const options = [
    "Package Donation",
    "Add Wallet Money",
    "Withdraw Wallet Money",
    "Funding Withdraw",
    "Commission Fee",
    "Funding Refund",
    "Funding Purchase",
    "Order Purchase",
    "Marketplace Withdraw",
    "Milestone First Half",
    "Milestone Second Half",
    "Withdraw Refund",
    "Withdraw Cancel"
];

function TransactionTable({ data }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        px: '2rem',
        py: '2rem',
        minHeight: '70%',
        borderRadius: 1
    };

    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedStatus, setSelectedStatus] = useState([]);

    console.log(selectedStatus);

    const handleClose = () => {
        setOpen(false);
    }

    const transactions = Array.from({ length: 5 }, (_, index) => ({
        date: "Sat, 21 Dec",
        time: "22:15",
        type: "Commission",
        description: "Receive commission money from game COTBA",
        amount: "+80.000 VND",
    }));

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '0.625rem',
                    py: '1rem',
                    px: '1.5rem',
                    boxShadow:
                        '0px 2px 2px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                    mb: '2rem'
                }}
            >
                <div className="flex flex-row justify-between items-center mb-[1rem]">
                    <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--grey)' }}>Latest Transactions</Typography>
                    <Tooltip title="Expand" arrow>
                        <IconButton
                            sx={{
                                p: '0.75rem',
                                color: 'var(--black)',
                                '&:hover': {
                                    backgroundColor: 'var(--white)',
                                },
                            }}
                            size="small"
                            onClick={() => setOpen(true)}
                        >
                            <ArrowOutwardIcon fontSize="inherit" style={{ strokeWidth: '2rem !important' }} />
                        </IconButton>
                    </Tooltip>
                </div>
                {transactions.map((transaction, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-row justify-between mb-[1rem]">
                            <div className="flex flex-col gap-[0.125rem]">
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 400 }}>
                                    {transaction.date} <span className="font-semibold">{transaction.time}</span>
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{transaction.type}</Typography>
                            </div>
                            <div className="flex flex-col gap-[0.125rem]">
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 400,
                                        textAlign: 'right',
                                        width: '8rem',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {transaction.description}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        textAlign: 'right',
                                        color: 'var(--primary-green)',
                                    }}
                                >
                                    {transaction.amount}
                                </Typography>
                            </div>
                        </div>
                        {index < transactions.length - 1 && (
                            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', mb: '1rem' }} />
                        )}
                    </React.Fragment>
                ))}
            </Paper>
            <Modal open={open} onClose={handleClose} slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                sx={{ zIndex: '50 !important' }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="mb-[2.5rem] mx-[0.5rem]">
                            <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                Platform Transactions
                            </Typography>
                            <Typography sx={{ mt: '0.5rem', fontSize: '1rem', fontWeight: 400 }}>
                                All transactions made in the platform will be showed here.
                            </Typography>
                        </div>
                        <div className='flex flex-row justify-between gap-[0.5rem]'>
                            <SearchBar onSearchChange={(value) => setSearchValue(value)} />
                            <SortDropdown options={options} onValueChange={(array) => setSelectedStatus(array)} />
                        </div>
                        <Box
                            sx={{
                                height: '25rem',
                                overflowY: 'auto',
                                mt: '1.5rem',
                                overflowX: 'visible',
                                px: '0.5rem',
                                scrollbarWidth: 'none',
                                '&::-webkit-scrollbar': {
                                    display: 'none'
                                },
                            }}
                        >
                            {transactions.map((transaction, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-row justify-between mb-[1.5rem]">
                                        <div className="flex flex-col gap-[0.25rem]">
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 400 }}>
                                                {transaction.date} <span className="font-semibold">{transaction.time}</span>
                                            </Typography>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>{transaction.type}</Typography>
                                        </div>
                                        <div className="flex flex-col gap-[0.25rem]">
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 400,
                                                    textAlign: 'right',
                                                    width: '30rem',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {transaction.description}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    textAlign: 'right',
                                                    color: 'var(--primary-green)',
                                                }}
                                            >
                                                {transaction.amount}
                                            </Typography>
                                        </div>
                                    </div>
                                    {index < transactions.length - 1 && (
                                        <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', mb: '1.5rem' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default TransactionTable;
