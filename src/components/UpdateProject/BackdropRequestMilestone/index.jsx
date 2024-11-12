import React, { useState } from 'react'
import { Backdrop, Button, Typography, Box } from '@mui/material'
import RequestMilestoneModal from '../../RequestMilestoneModal';
import './index.css'
const BackdropRequestMilestone = ({ isHidden, milestone, projectId, onCloseBackdrop, status }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleProcess = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        isHidden = true;
        // onCloseBackdrop(); // Close the Backdrop when modal is closed
    };
    const checkResponseStatus = (status) => {
        if (status === null || status === undefined) {
            throw new Error('Status cannot be null or undefined');
        }

        switch (status) {
            case 'completed':
                return <Typography variant='h4'>Milestone Completed</Typography>;
            case 'pending':
                return <Typography variant='h4'>Milestone Pending</Typography>;
            case 'submitted':
                return <Typography variant='h4'>Milestone has been submmited</Typography>;
        }
    }
    return (
        <>
            {/* when milestone not requested */}
            {status == 'not requested' && (
                <Backdrop
                    // className="overlay"
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position :'absolute'}}
                    open={isHidden}
                >
                    <Button variant="contained"
                        sx={{
                            width: "300px", whiteSpace: "nowrap"
                            , background: "#1BAA64", fontWeight: "bold", py: 1
                        }}
                        onClick={() => handleProcess()}
                        className="request-btn"
                    >
                        <Typography>Request Milestone</Typography>
                    </Button>
                    <RequestMilestoneModal
                        open={isModalOpen} handleClose={handleModalClose}
                        milestone={milestone} projectId={projectId} handleCloseBackdrop={onCloseBackdrop} />
                </Backdrop>
            )}

            {/* when milestone is completed */}
            {status !== 'not requested' && (status !== 'pending' || status === 'edit') && (
                <Backdrop
                    // className="overlay"
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position :'absolute' }}
                    open={isHidden}
                >
                    {checkResponseStatus(status)}
                    
                </Backdrop>
            )}    
        </>

    )
}

export default BackdropRequestMilestone