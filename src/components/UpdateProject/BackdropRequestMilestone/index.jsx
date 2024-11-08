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
        // onCloseBackdrop(); // Close the Backdrop when modal is closed
    };
    const checkResponseStatus = (status) => {
        if (status === null || status === undefined) {
            throw new Error('Status cannot be null or undefined');
        }

        switch (status) {
            case 'not requested':
                return <Typography variant='h4'>Request Milestone</Typography>;
            case 'completed':
                return <Typography variant='h4'>Milestone Completed</Typography>;
            case 'pending':
                return <Typography variant='h4'>Milestone Pending</Typography>;
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    }
    return (
        <>
            {/* when milestone not requested */}
            {status == 'error' && (
                <Backdrop
                    // className="overlay"
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isHidden}
                >
                    <Button variant="contained"
                        sx={{
                            width: "100%", whiteSpace: "nowrap"
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
                <Backdrop
                    // className="overlay"
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position :'absolute' }}
                    open={isHidden}
                >
                    {checkResponseStatus(status)}
                    
                </Backdrop>
        </>

    )
}

export default BackdropRequestMilestone