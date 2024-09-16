import React from 'react'
import { Box, Typography, Button, Stack, Container, Avatar, LinearProgress, styled, linearProgressClasses } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './index.css';
import ProjectImages from '../../components/ProjectImages';
import CssBaseline from '@mui/material/CssBaseline';
import { CiBookmark, CiHeart } from "react-icons/ci";

const ProjectDetail = () => {
  //sample data
  const sampleTile = 'Hollow Knight';
  const number = 30000000;
  const formattedNumber = number.toLocaleString('de-DE');
  const backers = 1000;
  const target = 100000000;
  const convertPercentage = (a, b) => Math.ceil((a / b) * 100);
  const daysLeft = 30;
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 15,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 20,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D8D8D8",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 40,
      backgroundColor: "#1BAA64",
    },
  }));
  return (
    
    <Grid container spacing={2} sx={{ marginTop: '100px' }}>
      <Grid size={6.5} sx={{ mt: '0 !important' }}>
        <Box>
          <ProjectImages />
        </Box>
      </Grid>
      <Grid size={5.5} sx={{ mt: '0 !important', justifyContent: 'space-between' }} paddingLeft={5}>
        {/* project detail */}
        <Container>
          <Typography sx={{ color: '#1BAA64', fontSize: '30px', fontStyle: 'italic', fontWeight: '200' }}>
            Funding
          </Typography>
          <Typography sx={{ fontSize: '54px', fontWeight: '800', marginTop: '8px' }}>
            {sampleTile.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: '18px', lineHeight: '27px', margin: '15px 0' }}>
            A beautiful and mysterious 2D adventure through a surreal world of insects and heroes. A game for PC, Mac and Linux
          </Typography>

          {/* owner info */}
          <Box sx={{ display: 'flex', alignItems: 'center', spacing: '10px', marginTop: '30px' }}>
            <Avatar sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <Box>
              <Typography sx={{ fontSize: '18px' }}>
                GameFounder123
              </Typography>
              <Typography sx={{ fontSize: '12px', opacity: '0.6' }}>
                1 campaign | Rollinsofrd, United States
              </Typography>
            </Box>
          </Box>
          {/* progress bar */}
          <Box>
            <Box sx={{ display: 'flex', marginTop: '27px', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '22px', fontWeight: 800 }}>
                {formattedNumber} <span style={{ fontSize: '18px', fontWeight: '400' }}>VND</span>
              </Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 800 }}>
                {backers} <span style={{ fontSize: '18px', fontWeight: '400' }}>backers</span>
              </Typography>
            </Box>
            <BorderLinearProgress variant="determinate" sx={{ width: "100%", my: 0, py: 1 }}
              value={60} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop : '5px' }}>
              <Typography sx={{ fontSize: '18px' }}>
                {convertPercentage(number, target)}% <span style={{ fontSize: '18px' }}>out of {target.toLocaleString('de-DE')} vnd</span>
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>
                {daysLeft} <span style={{ fontSize: '18px' }}>days left</span>
              </Typography>
            </Box>  
          </Box>

          {/* buttons interaction */}
          <Stack spacing={1} direction="column" sx={{ marginTop: '39px' }}>
            <Button variant="contained"
              sx={{
                width: "100%", whiteSpace: "nowrap"
                , background: "#1BAA64", fontWeight: "bold", py: 1
              }}
              className="like-btn"
            >
              Back this project
            </Button>

            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
              <Grid size={6}>
                <Button variant="contained"
                  sx={{
                    width: "100%", whiteSpace: "nowrap"
                    , background: "#F5F7F8", fontWeight: "bold", py: 1, color: '#000000', border: '1px solid #000000'
                  }}
                  className="like-btn"
                >
                  <CiBookmark style={{ marginRight: '5px', fontSize: '20px' }} />  Follow
                </Button>
              </Grid>
              <Grid size={6} >
                <Button variant="contained"
                  sx={{
                    width: "100%", whiteSpace: "nowrap"
                    , background: "#F5F7F8", fontWeight: "bold", py: 1, color: '#000000', border: '1px solid #000000'
                  }}
                  className="like-btn"
                >
                  <CiHeart style={{ marginRight: '5px', fontSize: '24px' }} />  Like
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  )
}

export default ProjectDetail
