import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Collapse,
  Container,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import "sweetalert2";
import fundingProjectApiInstace from "../../utils/ApiInstance/fundingProjectApiInstance";
import { toast, ToastContainer } from "react-toastify";
import { editorList } from "./UpdateMarketplaceProjectLayout";
import { useUpdateMarketplaceProject } from "../../contexts/UpdateMarketplaceProjectContext";
import marketplaceProjectApiInstace from "../../utils/ApiInstance/marketplaceProjectApiInstance";

const notify = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#ffffff",
      color: "#2F3645",
      fontWeight: "600",
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

function UpdateMarketplaceProjectLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditExpanded, setIsEditExpanded] = useState(false);
  const { marketplaceProject, setMarketplaceProject, edited, setEdited } =
    useUpdateMarketplaceProject();

  const handleSaveAll = async (event) => {
    event.preventDefault();
    try {
      console.log(project);

      const formData = new FormData();

      formData.append("Id", id);
      formData.append("Name", project.name);
      formData.append("Description", project.description);
      formData.append("Introduction", project.introduction);

      if (project.wallet.bankAccount) {
        formData.append("BankAccount.Id", project.wallet.bankAccount.id);
        formData.append(
          "BankAccount.BankNumber",
          project.wallet.bankAccount.bankNumber
        );
        formData.append(
          "BankAccount.BankCode",
          project.wallet.bankAccount.bankCode
        );
      }

      project.packages.forEach((packageItem, index) => {
        formData.append(`Packages[${index}].Id`, packageItem.id);
        formData.append(`Packages[${index}].Name`, packageItem.name);
        formData.append(
          `Packages[${index}].RequiredAmount`,
          packageItem.requiredAmount
        );
        formData.append(
          `Packages[${index}].Description`,
          packageItem.description
        );
        formData.append(
          `Packages[${index}].LimitQuantity`,
          packageItem.limitQuantity
        );
        if (packageItem.updatedImage) {
          formData.append(
            `Packages[${index}].UpdatedImage`,
            packageItem.updatedImage
          );
        }
        packageItem.rewardItems.forEach((reward, rewardIndex) => {
          formData.append(
            `Packages[${index}].RewardItems[${rewardIndex}].Id`,
            reward.id
          );
          formData.append(
            `Packages[${index}].RewardItems[${rewardIndex}].Name`,
            reward.name
          );
          formData.append(
            `Packages[${index}].RewardItems[${rewardIndex}].Description`,
            reward.description
          );
          formData.append(
            `Packages[${index}].RewardItems[${rewardIndex}].Quantity`,
            reward.quantity
          );
          if (reward.imageFile) {
            formData.append(
              `Packages[${index}].RewardItems[${rewardIndex}].ImageFile`,
              reward.imageFile
            );
          }
        });
      });

      if (project.fundingFiles) {
        project.fundingFiles.forEach((file, index) => {
          formData.append(`FundingFiles[${index}].Id`, file.id);
          formData.append(`FundingFiles[${index}].Name`, file.name);
          formData.append(`FundingFiles[${index}].UrlFile`, file.urlFile);
          formData.append(`FundingFiles[${index}].Filetype`, file.filetype);
          formData.append(`FundingFiles[${index}].IsDeleted`, file.isDeleted);
        });
      }
      if (project.existedFile) {
        project.existedFile.forEach((file, index) => {
          formData.append(`ExistedFile[${index}].Id`, file.id);
          formData.append(`ExistedFile[${index}].Name`, file.name);
          formData.append(`ExistedFile[${index}].Url`, file.url);
          formData.append(`ExistedFile[${index}].Filetype`, file.filetype);
          formData.append(`ExistedFile[${index}].IsDeleted`, file.isDeleted);
        });
      }

      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fundingProjectApiInstace.put("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        notify("Project saved successfully!", "success");
        console.log(response);
        setIsEdited(false);
      } else {
        console.error(`Unexpected status code: ${response.error}`);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
    }
  };

  const handleDiscardAll = async () => {
    fetchProject();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEdited(false);
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleNavigatePreview = (id) => {
    navigate(`/account/marketplace-projects/update/${id}/preview`);
  };

  const fetchProject = async () => {
    try {
      const response = await marketplaceProjectApiInstace.get(`/${id}`);
      if (response && response.data) {
        const project = response.data._data;

        // const existedFile = project.fundingFiles.map((file) => ({
        //   id: file.id,
        //   name: file.name,
        //   url: file.url,
        //   urlFile: null,
        //   filetype: file.filetype,
        //   isDeleted: file.isDeleted,
        //   newlyAdded: false,
        // }));

        setMarketplaceProject({
          project,
        });
      } else {
        console.error("No project data found");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditExpanded(!isEditExpanded);
  };

  const getActiveEditor = (id) => {
    const matchedEditor = editorList.find((item) =>
      location.pathname.includes(item.id)
    );
    return matchedEditor ? `Project Editor / ${matchedEditor.name}` : "";
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  const isEditorActive = editorList.some((item) =>
    location.pathname.includes(item.link(id))
  );

  const getActiveSection = (id) => {
    const activeEditor = getActiveEditor(id);
    if (activeEditor) return activeEditor;
    return "Unknown Section";
  };

  return (
    <>
      <Container
        sx={{
          mx: "0",
          px: "0 !important",
          width: "100% !important",
          maxWidth: "100% !important",
        }}
      >
        <Grid2 container>
          <Grid2
            size={2.5}
            sx={{
              minHeight: "100vh",
              backgroundColor: "#2F3645",
              pt: "4rem",
              color: "#F5F7F8",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "visible",
            }}
          >
            <div className="sticky mb-[8rem] top-[1.5rem] z-10">
              <div className="flex flex-col gap-[0.5rem] px-[2rem]">
                <span
                  className={`bg-[#1BAA64] text-[#EAEAEA] text-[0.75rem] px-[0.5rem] py-[0.25rem] rounded w-fit font-semibold ${
                    marketplaceProject.status >= 0 &&
                    marketplaceProject.status <= 8
                      ? "bg-[#1BAA64]"
                      : "bg-[#FABC3F]"
                  } `}
                >
                  {marketplaceProject.status >= 0 &&
                  marketplaceProject.status <= 8
                    ? "Funding"
                    : marketplaceProject.status === 9
                    ? "Marketing"
                    : "Unknown Status"}
                </span>
                <Typography
                  sx={{
                    color: "#F5F7F8",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    userSelect: "none",
                    width: "100%",
                  }}
                >
                  {marketplaceProject.name ? marketplaceProject.name : "N/A"}
                </Typography>
              </div>
              <div>
                <div className="mt-[2rem]">
                  <Typography
                    className="update-project-section"
                    onClick={() =>
                      navigate(`/account/projects/update/${project.id}/preview`)
                    }
                  >
                    Project Preview
                  </Typography>
                </div>
                <div>
                  <Typography
                    className="update-project-section"
                    onClick={handleEditToggle}
                    sx={{
                      backgroundColor:
                        isEditorActive && !isEditExpanded
                          ? "#88D1AE"
                          : "transparent",
                      color:
                        isEditorActive && !isEditExpanded
                          ? "#F5F7F8"
                          : "inherit",
                    }}
                  >
                    Project Editor
                    <IconButton sx={{ color: "#F5F7F8", ml: 1 }} size="small">
                      {isEditExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Typography>
                  <Collapse in={isEditExpanded} timeout="auto" unmountOnExit>
                    <List component="nav">
                      {editorList.map((item) => (
                        <ListItem
                          button
                          key={item.name}
                          onClick={() => handleNavigation(item.link(id))}
                          sx={{
                            backgroundColor: location.pathname.includes(
                              item.link(id)
                            )
                              ? "#88D1AE"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: "#88D1AE",
                              "& .MuiListItemText-root": {
                                color: "#F5F7F8",
                              },
                            },
                          }}
                        >
                          <ListItemText
                            primary={item.name}
                            sx={{
                              color: location.pathname.includes(item.link(id))
                                ? "#F5F7F8"
                                : "#F5F7F8",
                              fontSize: "1rem",
                              fontWeight: "600",
                              height: "2rem",
                              px: "2rem",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              </div>
            </div>
            <div>
              <Typography className="update-project-section">
                Learn More About Crowdfunding Policy
              </Typography>
              <Typography className="update-project-section">
                Get Help & Support
              </Typography>
            </div>
          </Grid2>
          <Grid2 size={9.5} style={{ position: "relative" }}>
            <div>
              <div className="fixed-update-header">
                <div>
                  <Typography
                    sx={{
                      color: "#2F3645",
                      fontSize: "1rem",
                      fontWeight: "700",
                      userSelect: "none",
                      width: "100%",
                    }}
                  >
                    {getActiveSection(id)}
                  </Typography>
                </div>
                <div className="flex justify-between gap-[1.5rem] items-center w-fit">
                  <Typography
                    sx={{
                      color: "#2F3645",
                      fontSize: "1rem",
                      fontWeight: "400",
                      userSelect: "none",
                      width: "fit-content",
                    }}
                  >
                    Have you finished?
                  </Typography>
                  <div className="flex gap-[1rem]">
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={!edited}
                      sx={{
                        backgroundColor: "transparent",
                        textTransform: "none",
                      }}
                      onClick={() => handleDiscardAll()}
                    >
                      Discard All Changes
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!edited}
                      sx={{ backgroundColor: "#1BAA64", textTransform: "none" }}
                      onClick={(event) => handleSaveAll(event)}
                    >
                      Save All Changes
                    </Button>
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </Grid2>
        </Grid2>
      </Container>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
      />
    </>
  );
}

export default UpdateMarketplaceProjectLayout;
