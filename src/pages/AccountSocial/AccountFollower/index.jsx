import { Avatar, Box, Button, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function AccountFollower({ user }) {
    return (
        <Paper elevation={2} sx={{ padding: '2rem', borderRadius: '0.625rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src='' sx={{ width: '6rem', height: '6rem', mb: '1rem' }} />
                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "var(--black)",
                        mb: "0.25rem",
                        textAlign: "center",
                        width: "15rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    diemyolo
                </Typography>
                <Typography
                    sx={{
                        fontSize: '0.625rem',
                        fontWeight: '700',
                        width: 'fit-content',
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        bgcolor: 'var(--primary-green)',
                        color: 'var(--white)',
                        borderRadius: '0.25rem',
                        mb: '0.25rem'
                    }}
                >
                    Game Owner
                </Typography>
            </Box>
            <Grid2 container sx={{ mt: '1.75rem' }} columnSpacing={2}>
                <Grid2 size={12}>
                    <Button variant='contained'
                        sx={{ width: '100%', backgroundColor: 'var(--primary-green)', textTransform: 'none', fontWeight: 600 }}
                        startIcon={<IoChatbubbleEllipsesOutline size={18} />}
                    >
                        Chat
                    </Button>
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default AccountFollower