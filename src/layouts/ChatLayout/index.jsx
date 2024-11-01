import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Container,
} from "@mui/material";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import chatApiInstace from "../../utils/ApiInstance/chatApiInstance";
import userApiInstace from "../../utils/ApiInstance/userApiInstance";

function ChatLayout() {
  //variables
  //token
  const token = Cookies.get("_auth");

  //hooks
  const [user, setUser] = useState(null);
  const [contactedUsers, setContactedUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchContactedUsers();
  }, [user, contactedUsers]);

  //fetch user
  const fetchUserData = () => {
    userApiInstace
      .get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data._data;

        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  //fetch contacted users
  const fetchContactedUsers = () => {
    chatApiInstace
      .get(`/users/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data._data;

          setContactedUsers(data);
        } else {
          Swal.fire({
            title: "Error",
            text: "Fetch chat users failed.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setTimeout();
          });
        }
      });
  };

  return (
    <Container
      sx={{
        width: "100% !important",
        maxWidth: "100% !important",
        height: "calc(100vh - 5rem - 2rem)",
        mt: "1rem",
      }}
    >
      <Grid2
        container
        columnSpacing={"1rem"}
        sx={{ height: "100% !important" }}
      >
        <Grid2
          size={4}
          sx={{
            backgroundColor: "#F5F7F9",
            height: "100% !important",
            overflowY: "auto",
            px: "1.5rem",
            py: "1rem",
            borderRadius: "0.625rem",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          {contactedUsers.length > 0 ? (
            contactedUsers.map((u, index) => (
              <div key={index}>
                <p>{u.userId}</p>
              </div>
            ))
          ) : (
            <p>Let's get in contact with someone...</p>
          )}
        </Grid2>
        <Grid2
          size={8}
          sx={{
            backgroundColor: "#F5F7F9",
            height: "100% !important",
            overflowY: "auto",
            px: "1.5rem",
            py: "1rem",
            borderRadius: "0.625rem",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
          }}
          className="scrollbar-hidden"
        >
          <Outlet />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ChatLayout;
