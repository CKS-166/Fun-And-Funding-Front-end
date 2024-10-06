import { Autocomplete, Avatar, Box, Divider, TextField, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';

function BankAccount() {
    const [bankList, setBankList] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);
    const [bankAccountNumber, setBankaccountNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');

    useEffect(() => {
        const fetchBank = axios.get("https://api.httzip.com/api/bank/list").then(res => {
            setBankList(res.data.data);
        })
    }, []);

    return (
        <div className='w-full pb-[5rem]'>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        userSelect: 'none',
                        width: '100%',
                        marginBottom: '1rem'
                    }}
                >
                    Bank Account
                </Typography>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1rem',
                        fontWeight: '400',
                        userSelect: 'none',
                        width: '100%',
                    }}
                >
                    Set up your bank account as a withdrawal source when funding successfully completed.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Your bank<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Please select your bank from the options.
                </Typography>
                <Autocomplete
                    freeSolo
                    className="custom-update-textfield"
                    disableClearable
                    value={selectedBank}
                    options={bankList}
                    getOptionLabel={(option) => option.name || ''}
                    onChange={(event, newValue) => {
                        setSelectedBank(newValue)
                    }}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Avatar alt={option.name} src={option.logo_url}
                                sx={{
                                    marginRight: 2, objectFit: 'fill', width: 60,
                                    height: 24
                                }} variant="rounded" />
                            <Typography variant="body1">{option.name}</Typography>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select bank"
                        />
                    )}
                />
            </div>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    className='basic-info-title'
                >
                    Your bank number<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    Provide a short description that best describes your campaign to your audience.
                </Typography>
                <TextField
                    value={bankAccountNumber}
                    className="custom-update-textfield"
                    type='number'
                    placeholder="Enter your account number"
                    onChange={(e) => setBankaccountNumber(e.target.value)}
                />
            </div>
            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', ml: '4rem', mr: '3rem' }} />
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                >
                    Account owner
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                >
                    If you change your bank account info, the bank's owner name should be newly display after you click "Check".
                </Typography>
                <TextField
                    disabled
                    placeholder='Name of the account owner'
                    value={ownerName}
                    className="custom-update-textfield"
                />
            </div>
        </div>
    )
}

export default BankAccount