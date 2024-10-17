import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    Box,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Stack
} from '@mui/material';
import Swal from 'sweetalert2';

const CreatorContract = ({ open, handleClose }) => {
    const navigate = useNavigate();
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleAccept = () => {
        if (isChecked) {
            handleClose();
            navigate('/request-funding-project/basic-info')
        } else {
            alert('Please accept the terms and conditions before proceeding.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>
                    Terms and Conditions for Project Creators
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    By creating a project on this crowdfunding platform, you agree to the following terms and conditions:
                </Typography>
                <ul>
                    <li>You must provide accurate information about your project.</li>
                    <li>Funds will only be disbursed according to the
                        <Link style={{ color: '#1BAA64', fontWeight: 600, cursor: 'pointer', marginLeft: '5px' }}>milestone-based process.</Link></li>
                    <li>All rewards promised must be delivered on time.</li>
                    <li>You are responsible for providing regular updates to backers.</li>
                    <li>Failure to complete the project may result in a refund to backers.</li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            Additional context about our rules can be found
                            <span style={{ color: '#1BAA64', fontWeight: 600, cursor: 'pointer', marginLeft: '5px' }}>here</span>
                        </Typography>
                    </li>
                </ul>
                <FormControlLabel
                    control={
                        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                    }
                    label="I have read and agree to the terms and conditions."
                />
                <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleAccept} variant="contained" color="primary">
                        Accept
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default CreatorContract