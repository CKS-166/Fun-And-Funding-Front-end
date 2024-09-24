import { Box, Container, Grid2, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import './index.css'
import ProjectForm from "../../components/CreateProject/ProjectForm";


const steps = [
  {
    label: 'Basic information',
    description: `Provide basic information about your project along with fundraising goal.`,
  },
  {
    label: 'Introduction',
    description:
      'Share and introduce the story behind the project.',
  },
  {
    label: 'Project media',
    description: `Provide dynamic images and videos for your project.`,
  },
  {
    label: 'Verify your bank account',
    description: `Set up your bank account as a withdrawal source.`,
  },
  {
    label: 'Project packages',
    description: `Set up your donate packages with corresponding rewards.`,
  },
];

const stepStyle = (active, completed) => ({
  backgroundColor: active ? "white" : completed ? "var(--primary-green)" : "rgba(0, 0, 0, 0.1)",
  "& .MuiStepLabel-iconContainer svg": { color: active ? "var(--primary-green)" : completed ? "white" : "rgba(0, 0, 0, 0.2)" },
  "& .MuiStepLabel-label": { color: active ? "black" : completed ? "white" : "rgba(0, 0, 0, 0.3)" },
  "& .MuiStepContent-root": { color: active ? "rgba(0, 0, 0, 0.5)" : completed ? "white" : "rgba(0, 0, 0, 0.1)" },
});



const CreateFundingProjectLayout = () => {
  const [formIndex, setFormIndex] = useState(0)

  return (
    <>
      <div className='h-[5rem] text-white flex justify-center items-center py-10 bg-gradient-to-r from-dark-green to-primary-green font-semibold text-2xl font1'>Fuel your dream...</div>
      <Container className='py-10' sx={{ maxWidth: { xs: "xs", lg: "lg", xl: "xl" } }}>
        <Grid2 container spacing={3}>
          <Grid2 size={3}>
            <Box sx={{ position: "sticky", top: "3rem", }}>
              <Stepper activeStep={formIndex} orientation="vertical">
                {steps.map((step, index) => (
                  <Step component={Paper} elevation={1} key={step.label} sx={stepStyle(index === formIndex, formIndex > index)}>
                    <StepLabel className="step_index">
                      <Typography sx={{ fontWeight: "bold", fontSize: ".9rem" }}>
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography sx={{ fontSize: ".9rem", textAlign: "left", pb: 2 }}>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid2>
          <Grid2 size={9}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Container >
    </>
  )
}

export default CreateFundingProjectLayout;