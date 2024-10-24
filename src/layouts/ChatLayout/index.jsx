import React from "react";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function ChatLayout() {
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
            boxShadow: "0 0 0.25rem 0.25rem #EAEAEA",
          }}
        >
          Chat List
        </Grid2>
        <Grid2
          size={8}
          sx={{
            backgroundColor: "#EAEAEA",
            height: "100% !important",
            overflowY: "auto",
            px: "1.5rem",
            py: "1rem",
            borderRadius: "0.625rem",
            boxShadow: "0 0 0.25rem 0.25rem #888888",
          }}
        >
          <Outlet />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ChatLayout;
