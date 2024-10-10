import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaBookBookmark, FaFolderOpen, FaUserTie } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import userApiInstace from "../../../utils/ApiInstance/userApiInstance";
import Swal from "sweetalert2";
import "./index.css";

function UserProfileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState(null);
  const fileInputRef = useRef(null);

  //cookie
  // const token = Cookies.get("_auth");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4OWJmMjFkLTlmOTQtNDY2OS04MzdiLTdkNThmMjE4Y2EzZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJEbyBZb28gTGltIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZG95b29saW1AZ21haWwuY29tIiwianRpIjoiSmNtRjh1ajJJU3ZlTDVGdnZOazRwbnA4eHJoSU56OC0xNjE0MjI1NjI0IiwiYXBpX2tleSI6IkpjbUY4dWoySVN2ZUw1RnZ2Tms0cG5wOHhyaElOejgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJCYWNrZXIiLCJleHAiOjE3Mjg5MTk4MDgsImlzcyI6IkFQUE9UQVBBWSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzIzNSJ9.qR99g7vFzi0Cs2lIcvON3ei0bfucUm3NNBBLz4WgAxM";

  const titleList = [
    { text: "Account", path: "/account/profile" },
    { text: "Projects", path: "/account/projects" },
    { text: "Bookmarks", path: "/account/bookmarks" },
    { text: "Orders", path: "/account/order" },
    { text: "Wallet", path: "/account/wallet" },
  ];

  const iconMapping = {
    0: <FaUserTie style={{ fontSize: "1.6rem" }} />,
    1: <FaFolderOpen style={{ fontSize: "1.6rem" }} />,
    2: <FaBookBookmark style={{ fontSize: "1.6rem" }} />,
    3: <FaClipboardList style={{ fontSize: "1.6rem" }} />,
    4: <IoMdWallet style={{ fontSize: "1.6rem" }} />,
  };
  const onClickMapping = {
    0: () => navigate("/account/profile"),
    1: () => navigate("/account/projects"),
    2: () => navigate("/account/bookmarks"),
    3: () => navigate("/account/bookmarks"),
    4: () => navigate("/account/wallet"),
  };

  //fetch api
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    userApiInstace
      .get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userData = response.data._data;

        setUser(userData);
        setAvatar(userData.avatar);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  //functions
  const handleChangeAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input dialog
    }
  };

  const handleUpdateAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("URL", file); // "URL" field for the file
    formData.append("Name", "avatar_" + user.userName); // Add the file name

    try {
      const response = await userApiInstace.patch("/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAvatar(response.data._data.avatar); // Update the avatar on success

        Swal.fire({
          title: "Success",
          text: "Update avatar successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          fetchUserData();
        });
      } else {
        throw new Error("Fetch API failed");
      }
    } catch (error) {
      console.error("Upload avatar failed:", error);
    }
  };

  return (
    <div className="mt-[2rem]">
      <div className="mx-[5.5rem]">
        <Grid2 container columnSpacing={"4rem"}>
          <Grid2 size={3.5}>
            <Paper
              elevation={3}
              sx={{
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                alignItems: "center",
                position: "sticky",
                top: "4.8rem",
                backgroundColor: "#F5F7F8",
              }}
            >
              <div className="flex w-full flex-col justify-center items-center">
                <div className="h-[8rem] w-full bg-[#1BAA64]"></div>
                <div className="rounded-full bg-[#F5F7F8] w-[11.6rem] h-[11.6rem] flex justify-center items-center mt-[-4.8rem] relative">
                  {true ? (
                    <Avatar
                      alt="User"
                      src={user?.avatar || ""}
                      sx={{ width: "10rem", height: "10rem" }}
                    />
                  ) : (
                    <Avatar
                      alt="User"
                      src={""}
                      sx={{ width: "10rem", height: "10rem" }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 12,
                    }}
                  >
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "white",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                        color: "#2F3645",
                        "&:hover": {
                          backgroundColor: "#1BAA64",
                          color: "white",
                          transition: "all 0.3s",
                        },
                      }}
                    >
                      <CameraAltIcon onClick={handleChangeAvatar} />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleUpdateAvatar}
                      />
                    </Avatar>
                  </div>
                </div>
              </div>
              {true ? (
                <div className="flex flex-col justify-center items-center overflow-hidden mx-[2rem]">
                  <h1 className="text-[1.4rem] text-[#2F3645] font-bold leading-relaxed my-[0.4rem]">
                    {user?.userName}
                  </h1>
                </div>
              ) : null}
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <List
                  sx={{ mx: "2.4rem", flexGrow: 1, mb: "1.2rem", mt: "0.8rem" }}
                >
                  {titleList.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <ListItem
                        key={item.text}
                        onClick={onClickMapping[index]}
                        sx={{ p: 0, mb: "0.8rem", borderRadius: "0.4rem" }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: "0.4rem",
                            backgroundColor: isActive
                              ? "#1BAA64"
                              : "transparent",
                            color: isActive ? "#F5F7F8" : "#2F3645",
                            "&:hover": {
                              boxShadow: "inset 0 0 0 1px #1BAA64",
                              backgroundColor: "#F5F7F8",
                              color: "#1BAA64 !important",
                              "& .MuiListItemIcon-root": {
                                color: "#1BAA64",
                              },
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isActive ? "#F5F7F8" : "#2F3645",
                              "&:hover": {
                                color: "#F5F7F8",
                              },
                            }}
                          >
                            {iconMapping[index]}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontSize: "1rem",
                              fontWeight: "600",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={8.5}>
            <Outlet />
          </Grid2>
        </Grid2>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfileLayout;
