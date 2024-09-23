import { Avatar, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function BackerCard() {
    const sampleName = "Euthanatos"
    const sampleMoney = "2.000.000 VND"
    return (
        <Card sx={{ width: '17.375rem', borderRadius: '0.625rem', backgroundColor: '#F5F7F8' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', py: '1.5rem !important', px: '2.5rem !important' }}>
                <Avatar src='' sx={{
                    width: '10rem', height: '10rem', mx: 'auto', mb: '1rem'
                }} />
                <Typography sx={{ fontWeight: '700', fontSize: '1.5rem', color: '#2F3645', textAlign: 'center', marginBottom: '1.5rem' }}>
                    {sampleName}
                </Typography>
                <Typography sx={{ fontWeight: '600', fontSize: '1.25rem', color: '#1BAA64', textAlign: 'center' }}>
                    {sampleMoney}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default BackerCard