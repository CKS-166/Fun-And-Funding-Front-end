import { useParams } from "react-router";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReportIcon from "@mui/icons-material/Report";
import DOMPurify from "dompurify";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ImUserCheck } from "react-icons/im";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Outlet } from "react-router";
import userApiInstace from "../../../utils/ApiInstance/userApiInstance";
import EmptyDocument from "../../../assets/images/Empty-Document.png";
import "./index.css";
import Footer from "../../../components/Footer";

const createMarkup = (htmlContent) => {
  return { __html: DOMPurify.sanitize(htmlContent) };
};

function PublicProfileLayout() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    userApiInstace
      .get(`/${id}`)
      .then((response) => {
        const userData = response.data._data;

        setUser(userData);

        console.log(user);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <div>
      <Paper
        elevation={4}
        sx={{
          mx: "5.5rem",
          height: "fit-content",
          mt: "2rem",
          backgroundColor: "#F5F7F8",
        }}
      >
        <div className="mx-[6rem] py-[3rem]">
          <div className="flex justify-between items-center gap-[4rem]">
            <div className="relative">
              <Avatar
                src={user?.avatar}
                alt="User"
                sx={{ width: "14rem", height: "14rem" }}
              />
            </div>
            <div className="w-[30.813rem] py-[1rem] flex flex-col justify-between h-[14rem]">
              <div className="w-full">
                <div className="flex justify-start items-center gap-[2rem]">
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "2rem",
                      color: "#2F3645",
                      width: "fit-content",
                    }}
                  >
                    {user?.fullName || ""}
                  </Typography>
                  <div className="flex justify-between gap-[0.75rem]">
                    <Chip
                      label="Game owner"
                      sx={{
                        borderRadius: "0.313rem",
                        fontSize: "1rem",
                        color: "#2F3645",
                      }}
                    />
                    <Chip
                      label="Excellent seller"
                      sx={{
                        borderRadius: "0.313rem",
                        fontSize: "1rem",
                        color: "#2F3645",
                      }}
                    />
                  </div>
                </div>
                <Typography
                  sx={{
                    fontWeight: "400",
                    marginBottom: "1.5rem",
                    fontSize: "1rem",
                    color: "#2F3645",
                  }}
                >
                  {user?.email || ""}
                </Typography>
              </div>
              <Typography
                sx={{
                  fontWeight: "700",
                  marginBottom: "0.25rem",
                  fontSize: "1.25rem",
                  color: "#2F3645",
                  my: "1rem",
                }}
              >
                Member since{" "}
                {user
                  ? dayjs(user?.createdDate).format("MMMM YYYY")
                  : dayjs().format("MMMM YYYY")}
              </Typography>
              <div className="flex justify-start gap-[1rem]">
                {false ? (
                  <Button
                    startIcon={
                      <PersonAddAlt1Icon style={{ strokeWidth: "0.5rem" }} />
                    }
                    sx={{
                      background: "#F5F7F8",
                      fontWeight: "600",
                      textTransform: "none",
                      px: "2rem",
                      fontSize: "1rem",
                      color: "#2F3645",
                      border: "2px solid #EAEAEA",
                    }}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    startIcon={
                      <ImUserCheck style={{ marginRight: "0.5rem" }} />
                    }
                    sx={{
                      background: "#1BAA64",
                      fontWeight: "600",
                      textTransform: "none",
                      px: "2rem",
                      fontSize: "1rem",
                      color: "#F5F7F8",
                    }}
                  >
                    Unfollow
                  </Button>
                )}
                <Button
                  startIcon={
                    <IoChatbubbleEllipsesSharp
                      style={{ marginRight: "0.5rem" }}
                    />
                  }
                  sx={{
                    background: "#1BAA64",
                    fontWeight: "600",
                    textTransform: "none",
                    px: "2rem",
                    fontSize: "1rem",
                    color: "#F5F7F8",
                  }}
                >
                  Contact
                </Button>
                <Button
                  startIcon={<ReportIcon style={{ marginRight: "0.5rem" }} />}
                  sx={{
                    background: "#d9534f",
                    fontWeight: "600",
                    textTransform: "none",
                    px: "2rem",
                    fontSize: "1rem",
                    color: "#F5F7F8",
                  }}
                >
                  Report
                </Button>
              </div>
            </div>
            <Divider
              orientation="vertical"
              sx={{
                border: "1px solid #EAEAEA",
                borderRadius: "0.625rem",
                height: "14rem",
              }}
            />
            <div className="flex flex-col items-center justify-center h-[14rem] gap-[3rem]">
              <div className="flex flex-col items-center">
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "3.5rem",
                    lineHeight: "1.75rem",
                    color: "#2F3645",
                    mb: "1rem",
                  }}
                >
                  0
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "1rem",
                    color: "#2F3645",
                  }}
                >
                  Total projects
                </Typography>
              </div>
              <div className="flex flex-col items-center">
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "3.5rem",
                    lineHeight: "1.75rem",
                    color: "#1BAA64",
                    mb: "1rem",
                  }}
                >
                  69%
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "1rem",
                    color: "#2F3645",
                  }}
                >
                  Positive feedbacks
                </Typography>
              </div>
            </div>
          </div>
          <Divider
            sx={{
              my: "2rem",
              border: "1px solid #EAEAEA",
              borderRadius: "0.625rem",
            }}
          />
          {user?.bio ? (
            <div>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  lineHeight: "1.75rem",
                  color: "#2F3645",
                  mb: "1rem",
                }}
              >
                ABOUT
              </Typography>
              <div
                className="user-bio-content text-[#2F3645]"
                dangerouslySetInnerHTML={createMarkup(user?.bio)}
              />
            </div>
          ) : (
            <div className="w-full flex flex-row justify-center items-center gap-[2rem] mt-[2rem]">
              <img
                src={EmptyDocument}
                alt="Not found"
                className="my-[2rem] w-[10rem] h-[6rem]"
              />
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  color: "#969696",
                }}
              >
                No bio
              </Typography>
            </div>
          )}
        </div>
      </Paper>
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicProfileLayout;
