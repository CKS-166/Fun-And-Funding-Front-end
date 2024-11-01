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
            {status == 'completed' && (
                <Backdrop
                    // className="overlay"
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position :'absolute' }}
                    open={isHidden}
                >
                   
                        <Typography variant='h4'>Milestone Completed</Typography>
                    
                </Backdrop>


            )}
        </>

    )
}

export default BackdropRequestMilestone