import ForumIcon from "@mui/icons-material/Forum";
import { TabContext, TabList } from "@mui/lab";
import { Badge, Box, Button, Grid2, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import AccountFollower from "./AccountFollower";
import AccountFollowing from "./AccountFollowing";
import "./index.css";

function AccountSocial() {
  const [tabValue, setTabValue] = useState("1");

  const handleTabValue = (event, newValue) => {
    const validValues = ["1", "2", "3", "4"];
    setTabValue(validValues.includes(newValue) ? newValue : "1");
  };
  return (
    <div className="pl-[4rem] pr-[5.5rem] mt-[2rem] mb-[4rem]">
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-[1rem] items-start flex-col">
          <h1 className="!text-[1.5rem] text-left font-bold text-[#2F3645]">
            Your Message
          </h1>
          <Typography
            sx={{
              color: "#2F3645",
              fontSize: "1rem",
              fontWeight: "400",
              userSelect: "none",
              width: "70%",
            }}
          >
            Stay connected by managing your messages. View, reply to, or
            organize conversations with other backers.
          </Typography>
        </div>
        <a href="/chat">
          <Badge
            badgeContent={3}
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                transform: "translate(50%, -50%)",
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<ForumIcon />}
              sx={{
                color: "var(--white)",
                backgroundColor: "var(--primary-green)",
                textTransform: "none !important",
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                },
                ".MuiButton-startIcon": {
                  marginRight: "12px",
                },
                width: "15rem",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              See all messages
            </Button>
          </Badge>
        </a>
      </div>
      <TabContext value={tabValue}>
        <Box className="account-social-tab-context">
          <Box>
            <TabList
              onChange={handleTabValue}
              className="account-social-tablist"
              sx={{
                "& .MuiTabs-scroller": {
                  display: "flex",
                  justifyContent: "flex-start",
                },
              }}
            >
              <Tab
                label={`Following Users (0)`}
                className="account-social-tab"
                value="1"
              />
              <Tab
                label={`Followers (0)`}
                className="account-social-tab"
                value="2"
              />
              <Tab
                label={`Following Funding Projects (0)`}
                className="account-social-tab"
                value="3"
              />
              <Tab
                label={`Liked Marketplace Projects (0)`}
                className="account-social-tab"
                value="4"
              />
            </TabList>
            {tabValue === "1" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--black)",
                      mb: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Total followings: <span className="mr-[1rem]"></span>10
                    accounts
                  </Typography>
                  {true ? (
                    <Box>
                      <Grid2 container columnSpacing={3} rowSpacing={3}>
                        <Grid2 size={4}>
                          <AccountFollowing />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollowing />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollowing />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollowing />
                        </Grid2>
                      </Grid2>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--black)",
                        mb: "2rem",
                        textAlign: "center",
                      }}
                    >
                      Nothing to show
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            {tabValue === "2" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--black)",
                      mb: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Total followers: <span className="mr-[1rem]"></span>10
                    accounts
                  </Typography>
                  {true ? (
                    <Box>
                      <Grid2 container columnSpacing={3} rowSpacing={3}>
                        <Grid2 size={4}>
                          <AccountFollower />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollower />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollower />
                        </Grid2>
                        <Grid2 size={4}>
                          <AccountFollower />
                        </Grid2>
                      </Grid2>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--black)",
                        mb: "2rem",
                        textAlign: "center",
                      }}
                    >
                      Nothing to show
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            {tabValue === "3" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--black)",
                      mb: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Total Following Funding Projects:{" "}
                    <span className="mr-[1rem]"></span>10 projects
                  </Typography>
                </Box>
              </Box>
            )}
            {tabValue === "4" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--black)",
                      mb: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Total Liked Marketplace Projects:{" "}
                    <span className="mr-[1rem]"></span>10 projects
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </TabContext>
    </div>
  );
}

export default AccountSocial;
