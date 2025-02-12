import {
  Box,
  Container,
  Grid2,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router";
import "./index.css";
import { steps, stepStyle } from "./CreateMarketplaceProjectLayout";
import { useCreateMarketplaceProject } from "../../contexts/CreateMarketplaceProjectContext";
import { CreateMarketplaceProjectProvider } from "../../contexts/CreateMarketplaceProjectContext";
import marketplaceProjectApiInstace from "../../utils/ApiInstance/marketplaceProjectApiInstance";
import fundingProjectApiInstance from "../../utils/ApiInstance/fundingProjectApiInstance";

const CreateMarketplaceProjectLayout = () => {
  const { id } = useParams();
  const formRef = useRef();
  const { marketplaceProject, setMarketplaceProject, formIndex, setFormIndex } =
    useCreateMarketplaceProject();

  useEffect(() => {
    if (formRef.current) {
      window.scrollTo({ top: formRef.current.offsetTop, behavior: "smooth" });
    }
  }, [formIndex]);

  useEffect(() => {
    fetchFundingProject();
  }, []);

  const fetchFundingProject = async () => {
    await fundingProjectApiInstance
      .get(`/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data._data;

          console.log(data);

          setMarketplaceProject({
            name: data.name || "",
            description: data.description || "",
            introduction: data.introduction || "",
            price: 1000,
            fundingProjectId: data.id || "",
            marketplaceFiles: [],
            categories:
              data.categories?.map((category) => ({
                id: category.id || "",
                name: category.name || "",
              })) || [],
          });

          console.log(marketplaceProject);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="h-[5rem] text-white flex justify-center items-center py-10 bg-gradient-to-r from-dark-green to-primary-green font-semibold text-2xl font1">
        Fuel your dream...
      </div>
      <Container
        className="py-10"
        sx={{ maxWidth: { xs: "xs", lg: "lg", xl: "xl" } }}
      >
        <Grid2 container spacing={3}>
          <Grid2 size={3}>
            <Box sx={{ position: "sticky", top: "3rem" }}>
              <Stepper activeStep={formIndex} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    component={Paper}
                    elevation={1}
                    key={step.label}
                    sx={stepStyle(index === formIndex, formIndex > index)}
                  >
                    <StepLabel className="step_index">
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: ".9rem" }}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography
                        sx={{ fontSize: ".9rem", textAlign: "left", pb: 2 }}
                      >
                        {step.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}></Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid2>
          <Grid2 size={9}>
            <div ref={formRef}></div>
            <Outlet />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default CreateMarketplaceProjectLayout;
