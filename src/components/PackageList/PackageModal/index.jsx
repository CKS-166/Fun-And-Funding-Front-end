import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import kuru from '../../../assets/images/ktm.jpg';
import PackageItem from '../PackageReward/PackageItem';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow : 'auto'
};

const PackageModal = ({ open, handleClose, item, onDonate }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="package-reward" sx={style}>
                <Box sx={{ display: 'flex', padding: '34px' }} >
                    <Box className='package-image' sx={{ width: '50%' }}>
                        <img src={kuru} />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#1BAA64', marginTop: '10px' }}>
                            {item.requiredAmount.toLocaleString('de-DE')}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', opacity: 0.5, marginTop: '10px' }}>
                            {item.description}
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', marginTop: '10px' }}>
                            {item.limitQuantity} <span style={{ fontWeight: '400' }}>are left</span>
                        </Typography>
                        <Button sx={{
                            width: "100%", whiteSpace: "nowrap"
                            , background: "#1BAA64", fontWeight: "bold", py: 1,
                            borderRadius: '8px', color: '#FFFFFF', marginTop: '10px'
                        }}
                            className='pledge-btn'
                            onClick={() =>onDonate()}>
                            Pledge
                        </Button>
                    </Box>
                </Box>
                <Box className='package-item' sx={{ padding: '34px' }}>
                    <Grid container spacing={2}>
                        {item.rewardItems.map((rItem, index) => (
                            <Grid size={6}>
                                <PackageItem item={rItem} />
                            </Grid>
                        ))}
                    </Grid>

                </Box>
            </Box>
        </Modal>
    );
};

export default PackageModal;