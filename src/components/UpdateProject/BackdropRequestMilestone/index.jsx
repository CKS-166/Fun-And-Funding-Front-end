import React,{useState} from 'react'
import { Backdrop, Button,Typography } from '@mui/material'
import RequestMilestoneModal from '../../RequestMilestoneModal';
const BackdropRequestMilestone = ({ isHidden, milestone, projectId, onCloseBackdrop }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleProcess = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        onCloseBackdrop(); // Close the Backdrop when modal is closed
      };
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!isHidden}
        >
            <Button variant="contained"
                sx={{
                    width: "100%", whiteSpace: "nowrap"
                    , background: "#1BAA64", fontWeight: "bold", py: 1
                }}
                onClick={() => handleProcess()}
                className="like-btn"
            >
                <Typography>Request Milestone</Typography> 
            </Button>
            <RequestMilestoneModal 
            open ={isModalOpen} handleClose={handleModalClose} 
            milestone={milestone} projectId={projectId}/>
        </Backdrop>
    )
}

export default BackdropRequestMilestone