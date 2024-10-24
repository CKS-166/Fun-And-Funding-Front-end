import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Box, Typography, Button, Stack, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import './index.css'
import projectMilestoneApiInstance from '../../utils/ApiInstance/projectMilestoneApiInstance';
const RequestMilestoneModal = ({ open, handleClose, milestone, projectId }) => {
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
  const [startDate, setStartDate] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleSubmit = () => {
    if (!startDate) {
      setAlert(true); // Show alert if no date selected
      return;
    }
    try {
      projectMilestoneApiInstance.post("",{
        "createdDate": startDate,
        "status": 0,
        "milestoneId": milestone.id,
        "fundingProjectId": projectId
      })
      .then(res => {
        console.log(res);
        Swal.fire({
          title: `Request for ${milestone.milestoneName} sent!`,
          text: "The waiting process can take 2-5 days. Thank you for your patience.Please check your email for more details.",
          icon: "success"
        });
        handleClose();
      })
      .catch(error => {
        handleClose();
        console.log(error)
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error"
        });
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
      });
    }
    console.log("Start Date:", startDate.format("YYYY-MM-DD"));
    // Close the modal after submitting
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ margin: '20px 0' }}>
      <Box sx={modalStyle}>
        <Typography variant="h5" gutterBottom>
          {milestone.milestoneName}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Goal:</strong>
        </Typography>
        <ul>
          <li>{milestone.description}</li>
        </ul>

        <Typography variant="body2" gutterBottom>
          <strong>Duration:</strong>
        </Typography>
        <ul>
          <li>{milestone.duration} days</li>
        </ul>

        {/* <Typography variant="body2" gutterBottom>
            <strong>Partial Disbursement:</strong>
          </Typography>
          <ul>
            <li>5% of the milestone amount is transferred upfront.</li>
            <li>Another 5% upon successful completion.</li>
          </ul> */}

        <Typography variant="h6" gutterBottom>
          Requirements:
        </Typography>
        {milestone.requirements.map((req, index) => (
          <ul>
            <li key={index}>{req.description}</li>
          </ul>
        ))}
        {/* <strong>Mandatory:</strong>
          <ul>
            <li> 
              <strong></strong> A List of Educational Gameplay Features, including:
              <ul>
                <li>Describe key gameplay elements (e.g., platformer levels, puzzle mechanics).</li>
                <li>Outline educational components integrated within gameplay (e.g., quizzes, spelling challenges).</li>
                <li>Indicate target learning objectives (e.g., math skills, problem-solving, creativity).</li>
              </ul>
            </li>
          </ul>
          <strong>Optional:</strong>
          <ul>
            <li>Progress updates with screenshots,videos or documents shared with backers.</li>
          </ul>
   */}
        <Typography variant="h6" gutterBottom>
          Validation Criteria:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Additional context about our criteria can be found
          <span style={{ color: '#1BAA64', fontWeight: 600, cursor: 'pointer', marginLeft: '5px' }}>here</span>
        </Typography>
        {/* <ul>
            <li>Graded by backers on gameplay quality, educational value, and engagement.</li>
            <li>Admin reviews feedback from backers.</li>
            <li>
              <strong>Extension:</strong> 
              <ul>
                <li>If grade is less than 3.5/5, developers get an extension to fix issues.</li>
                <li>Failure after extension leads to project cancellation and backer refunds.</li>
              </ul>
            </li>
          </ul> */}

        <Stack spacing={2} mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Start Date"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          {alert && (
            <Alert severity="error" onClose={() => setAlert(false)}>
              Please select a start date!
            </Alert>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default RequestMilestoneModal