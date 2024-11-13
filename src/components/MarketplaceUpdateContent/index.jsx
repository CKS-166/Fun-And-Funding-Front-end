import { Paper, Typography } from '@mui/material'
import React from 'react'

function MarketplaceUpdateContent() {
    return (
        <Paper sx={{ backgroundColor: 'var(--white)', borderRadius: '0.625rem', py: '2rem', px: '3rem' }} elevation={3}>
            <Typography
                sx={{
                    fontSize: "0.75rem",
                    fontWeight: '400',
                    color: 'var(--black)',
                    mb: '2rem'
                }}
            >
                Update (#3)
            </Typography>
            <Typography
                sx={{
                    fontSize: "0.75rem",
                    fontWeight: '400',
                    color: 'var(--black)',
                    mb: '2rem'
                }}
            >
                Post E3 Wrap! Silksong Systems Update!
            </Typography>
        </Paper>
    )
}

export default MarketplaceUpdateContent