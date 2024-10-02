import { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { FaAddressCard, FaBirthdayCake, FaLock, FaUser } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

function AccountProfile() {
  //hooks
  const [isEditProfile, setIsEditProfile] = useState(false);

  //functions

  //edit profile
  const handleEditProfile = () => {};

  //update profile
  const handleUpdateProfile = () => {};

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        px: "2rem",
        py: "1.6rem",
        backgroundColor: "#F5F7F8",
      }}
    >
      <h1 className="text-left w-full text-[1.25rem] font-bold mb-[3.2rem]">
        Profile
      </h1>
      <div className="w-full mb-[3.2rem]">
        <div className="flex justify-between gap-[1rem] items-center mb-[1.2rem]">
          <div className="flex justify-between gap-[1rem] items-center">
            <FaAddressCard style={{ color: "#2F3645", fontSize: "1.4rem" }} />
            <h1 className="text-[1rem] text-left font-bold">
              Personal Information
            </h1>
          </div>
          {!isEditProfile ? (
            <div className="flex justify-center gap-4 profileButton">
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
                sx={{
                  color: "#2F3645",
                  backgroundColor: "#F5F7F8",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#1BAA64",
                    color: "#F5F7F8",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  ".MuiButton-startIcon": {
                    marginRight: "12px",
                  },
                  fontWeight: "bold",
                }}
              >
                Edit
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 profileButton">
              <Button
                variant="contained"
                startIcon={<ImBin2 />}
                onClick={handleEditProfile}
                sx={{
                  color: "#2F3645",
                  backgroundColor: "#F5F7F8",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#D9534F",
                    color: "#F5F7F8",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  ".MuiButton-startIcon": {
                    marginRight: "12px",
                  },
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleUpdateProfile}
                sx={{
                  color: "#2F3645",
                  backgroundColor: "#F5F7F8",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#1BAA64",
                    color: "#F5F7F8",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  fontWeight: "bold",
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default AccountProfile;
