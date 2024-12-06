import React, { useState } from 'react'
import { Backdrop, Button, Typography, Box } from '@mui/material'
import RequestMilestoneModal from '../../RequestMilestoneModal';
import './index.css'

const BackdropRequestMilestone = ({ render, isHidden, milestone, projectId, onCloseBackdrop, status }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(status);

    const handleProcess = () => {
        setIsModalOpen(true);
    };

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
                return <Typography variant='h4'>Milestone has been submitted</Typography>;
            case 'failed':
                return <Typography variant='h4'>Milestone has failed</Typography>;
            case 'reSubmitted':
                return <Typography variant='h4'>Milestone has been re-submitted</Typography>;
            default:
                return null;
        }
    };

    // Exclude 'warning', 'edit', and 'create' statuses from showing the backdrop
    const shouldShowBackdrop = !['warning', 'edit', 'create'].includes(status);

    return (
        <>
            {/* When milestone is not requested */}
            {status === 'not requested' && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
                    open={isHidden}
                >
                    <Button
                        variant="contained"
                        sx={{
                            width: "300px", whiteSpace: "nowrap",
                            background: "#1BAA64", fontWeight: "bold", py: 1
                        }}
                        onClick={() => handleProcess()}
                        className="request-btn"
                    >
                        <Typography>Request Milestone</Typography>
                    </Button>
                    <RequestMilestoneModal
                        render={render}
                        open={isModalOpen}
                        handleClose={handleModalClose}
                        milestone={milestone}
                        projectId={projectId}
                        handleCloseBackdrop={onCloseBackdrop}
                    />
                </Backdrop>
            )}

            {/* When milestone is in other statuses */}
            {status !== 'not requested' && shouldShowBackdrop && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
                    open={isHidden}
                >
                    {checkResponseStatus(status)}
                </Backdrop>
            )}
        </>
    );
};

export default BackdropRequestMilestone;