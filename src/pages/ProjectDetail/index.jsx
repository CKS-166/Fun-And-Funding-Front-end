/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { TabContext, TabList } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Tab,
  tabsClasses,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DOMPurify from "dompurify";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackerSection from "../../components/BackerSection";
import CommentSection from "../../components/CommentSection";
import PackageReward from "../../components/PackageList/PackageReward";
import PackageSide from "../../components/PackageList/PackageSide";
import ProjectImages from "../../components/ProjectImages";
import ProjectIntro from "../../components/ProjectIntro";
import ReportForm from "../../components/ReportPopUp";
import RequestMilestoneModal from "../../components/RequestMilestoneModal";
import UpdatesSection from "../../components/UpdatesSection";
import fundingProjectApiInstance from "../../utils/ApiInstance/fundingProjectApiInstance";
import milestoneApiInstace from "../../utils/ApiInstance/milestoneApiInstance";
import "./index.css";
const notify = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontWeight: "bold",
    },
  };

  if (type === "warn") {
    toast.warn(message, options);
  } else if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  }
};

const ProjectDetail = () => {
  const token = Cookies.get("_auth");
  //sample owwner
  const [isOwner, setIsOwner] = useState(true);

  //sample data
  const { id } = useParams();
  console.log(id);
  const number = 30000000;
  const formattedNumber = number.toLocaleString("de-DE");
  const backers = 1000;
  const target = 100000000;
  const convertPercentage = (a, b) => Math.ceil((a / b) * 100);
  const [tabValue, setTabValue] = useState("1");
  const [projectData, setProjectData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [saniIntro, setSaniIntro] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [firstMilestone, setFirstMilestone] = useState({});
  // project status
  const processing = 2;
  const fundedSuccessful = 3;
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // status logic onclick
  const handleRequestMilestone = () => {
    setIsModalOpen(true);
    console.log(firstMilestone);
    console.log("a");
  };
  const handleUpdateProject = () => {
    console.log("b");
  };

  const handleProcess = () => {
    const fixStatus = projectData.status;

    switch (fixStatus) {
      case processing:
        return handleUpdateProject();
        break;
      case fundedSuccessful:
        return handleRequestMilestone();
        break;
      default:
        return;
    }
  };
  //check project owner
  const checkOwner = () => {
    fundingProjectApiInstance
      .get("/project-owner", {
        params: {
          projectId: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setIsOwner(response.data.result._data);
      });
  };
  //fetch milestones
  const fetchMilestones = async () => {
    try {
      milestoneApiInstace.get(`/group-latest-milestone`).then((response) => {
        setMilestones(response.data._data);
        let first = response.data._data.find(
          (milestone) => milestone.milestoneOrder === 1
        );
        setFirstMilestone(first);
        console.log(response.data._data);
      });
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };
  //fetch project data
  const fetchProject = async () => {
    try {
      const { data } = await fundingProjectApiInstance
        .get(`/${id}`)
        .then((response) => {
          setProjectData(response.data._data);
          setIsLoading(true);
          const start = new Date(response.data._data.startDate);
          const end = new Date(response.data._data.endDate);
          const timeDiff = end - start;
          const sanitizeIntro = DOMPurify.sanitize(
            response.data._data.introduction
          );
          setSaniIntro(sanitizeIntro);
          console.log(sanitizeIntro);
          // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
          const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
          setDaysLeft(dayDiff);
        });
      console.log(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  useEffect(() => {
    fetchProject();
    fetchMilestones();
    checkOwner();
  }, [id]);

  console.log(projectData);

  //handleTab
  const handleTabValue = (event, newValue) => {
    const validValues = ["1", "2", "3", "4", "5", "6"];
    setTabValue(validValues.includes(newValue) ? newValue : "1"); // Default to "Introduction"
  };
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 15,
    borderRadius: 40,
    // marginTop: 20,
    marginBottom: 20,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D8D8D8",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 40,
      backgroundColor: "#1BAA64",
    },
  }));
  //handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  return (
    <Box>
      {isLoading && (
        <>
          <Box sx={{ backgroundColor: "#FFFFFF" }}>
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid size={6.5} sx={{ mt: "0 !important" }}>
                  <Box>
                    <ProjectImages files={projectData.fundingFiles} />
                  </Box>
                </Grid>
                <Grid
                  size={5.5}
                  sx={{ mt: "0 !important", justifyContent: "space-between" }}
                  paddingLeft={5}
                >
                  {/* project detail */}
                  <Container>
                    <div className="flex justify-between">
                      <Typography
                        sx={{
                          color: "#1BAA64",
                          fontSize: "30px",
                          fontStyle: "italic",
                          fontWeight: "200",
                        }}
                      >
                        Funding
                      </Typography>
                      <ReportProblemIcon onClick={handleOpenDialog} />
                    </div>

                    <ReportForm
                      projectId={id}
                      closeDialog={handleCloseDialog}
                      openDialog={openDialog}
                    />
                    <Typography
                      sx={{
                        fontSize: "54px",
                        fontWeight: "800",
                        marginTop: "8px",
                      }}
                    >
                      {projectData.name.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        lineHeight: "27px",
                        margin: "15px 0",
                      }}
                    >
                      {projectData.description}
                    </Typography>

                    {/* owner info */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        spacing: "10px",
                        marginTop: "30px",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: "18px" }}>
                          {projectData.user.fullName}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", opacity: "0.6" }}>
                          1 campaign | Rollinsofrd, United States
                        </Typography>
                      </Box>
                    </Box>
                    {/* progress bar */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          marginTop: "27px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontSize: "22px", fontWeight: 800 }}>
                          {projectData.balance.toLocaleString("de-DE")}{" "}
                          <span style={{ fontSize: "18px", fontWeight: "400" }}>
                            VND
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: "22px", fontWeight: 800 }}>
                          {backers}{" "}
                          <span style={{ fontSize: "18px", fontWeight: "400" }}>
                            backers
                          </span>
                        </Typography>
                      </Box>
                      <BorderLinearProgress
                        variant="determinate"
                        sx={{ width: "100%", my: 0, py: 1 }}
                        value={convertPercentage(
                          projectData.balance,
                          projectData.target
                        )}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "5px",
                        }}
                      >
                        <Typography sx={{ fontSize: "18px" }}>
                          {convertPercentage(
                            projectData.balance,
                            projectData.target
                          )}
                          %{" "}
                          <span style={{ fontSize: "18px" }}>
                            out of {projectData.target.toLocaleString("de-DE")}{" "}
                            vnd
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: "18px" }}>
                          {daysLeft}{" "}
                          <span style={{ fontSize: "18px" }}>days left</span>
                        </Typography>
                      </Box>
                    </Box>

                    {/* buttons interaction */}
                    <Stack
                      spacing={1}
                      direction="column"
                      sx={{ marginTop: "39px" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          whiteSpace: "nowrap",
                          background: "#1BAA64",
                          fontWeight: "bold",
                          py: 1,
                        }}
                        onClick={() => {
                          if (isOwner) {
                            handleProcess();
                          }
                        }}
                        className="like-btn"
                      >
                        {isOwner ? (
                          <Typography>
                            {projectData.status == processing
                              ? "Update Project"
                              : "Request Milestone Disbursement"}
                          </Typography>
                        ) : (
                          <Typography>Back this project</Typography>
                        )}
                      </Button>
                      {firstMilestone && (
                        <RequestMilestoneModal
                          milestone={firstMilestone}
                          open={isModalOpen}
                          handleClose={() => handleClose()}
                          projectId={projectData.id}
                        />
                      )}
                      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                        <Grid size={6}>
                          <Button
                            variant="contained"
                            sx={{
                              width: "100%",
                              whiteSpace: "nowrap",
                              background: "#FFFFFF",
                              fontWeight: "bold",
                              py: 1,
                              color: "#000000",
                              border: "1px solid #000000",
                            }}
                            className="like-btn"
                          >
                            <CiBookmark
                              style={{ marginRight: "5px", fontSize: "20px" }}
                            />{" "}
                            Follow
                          </Button>
                        </Grid>
                        <Grid size={6}>
                          <Button
                            variant="contained"
                            sx={{
                              width: "100%",
                              whiteSpace: "nowrap",
                              background: "#FFFFFF",
                              fontWeight: "bold",
                              py: 1,
                              color: "#000000",
                              border: "1px solid #000000",
                            }}
                            className="like-btn"
                          >
                            <CiHeart
                              style={{ marginRight: "5px", fontSize: "24px" }}
                            />{" "}
                            Like
                          </Button>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </Box>
          {/* tab value */}
          <TabContext value={tabValue}>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <Box>
                <TabList
                  onChange={handleTabValue}
                  // centered
                  // variant="fullWidth"
                  className="detail-tab"
                  sx={{
                    background: "white",
                    [`& .${tabsClasses.scrollButtons}`]: {
                      "&.Mui-disabled": { opacity: 0.3 },
                    },
                    [`& .MuiTabs-indicator`]: {
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  {/* intro */}
                  <Tab
                    label="Introduction"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      px: 4,
                      py: 3,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "rgba(0, 0, 0, 0.6) !important",
                      "&:active": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                      "&:focus": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                    }}
                    value="1"
                  />
                  {/* reward */}
                  <Tab
                    label="Rewards"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      px: 4,
                      py: 3,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "rgba(0, 0, 0, 0.6) !important",
                      "&:active": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                      "&:focus": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                    }}
                    value="2"
                  />
                  {/* comment  */}
                  <Tab
                    label="Comments"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      px: 4,
                      py: 3,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "rgba(0, 0, 0, 0.6) !important",
                      "&:active": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                      "&:focus": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                    }}
                    value="3"
                  />
                  <Tab
                    label="Updates"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      px: 4,
                      py: 3,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "rgba(0, 0, 0, 0.6) !important",
                      "&:active": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                      "&:focus": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                    }}
                    value="4"
                  />
                  <Tab
                    label="Backers"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      px: 4,
                      py: 3,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "rgba(0, 0, 0, 0.6) !important",
                      "&:active": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                      "&:focus": {
                        outline: "none !important",
                        color: "#1BAA64 !important",
                        background: "transparent !important",
                      },
                    }}
                    value="5"
                  />
                </TabList>
              </Box>
              <Divider />
            </Box>

            <Container
              maxWidth={tabValue === "2" ? "false" : "lg"}
              className="flex flex-row "
            >
              {tabValue === "1" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: "80px",
                  }}
                >
                  <Box sx={{ marginRight: "150px" }}>
                    <Box>
                      <ProjectIntro intro={saniIntro} />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <PackageSide
                        packageList={projectData.packages}
                        reloadDetail={fetchProject}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
              {tabValue === "2" && (
                <Container maxWidth="1400px">
                  <PackageReward
                    packageList={projectData.packages}
                    reloadDetail={fetchProject}
                  />
                </Container>
              )}
              {tabValue === "3" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: "80px",
                  }}
                >
                  <Box sx={{ marginRight: "150px" }}>
                    <Box>
                      <CommentSection
                        isBacker={true}
                        projectId={projectData.id}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <PackageSide
                        packageList={projectData.packages}
                        reloadDetail={fetchProject}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
              {tabValue === "4" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: "80px",
                  }}
                >
                  <Box sx={{ marginRight: "150px" }}>
                    <Box>
                      <UpdatesSection />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <PackageSide
                        packageList={projectData.packages}
                        reloadDetail={fetchProject}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
              {tabValue === "5" && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "80px",
                    }}
                  >
                    <Box sx={{ marginRight: "150px" }}>
                      <Box>
                        <BackerSection />
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <PackageSide packageList={projectData.packages} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Container>
          </TabContext>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
        </>
      )}
    </Box>

    // tab value
  );
};

export default ProjectDetail;
