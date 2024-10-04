import { useState } from "react";
import dayjs from "dayjs";
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
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  FaAddressCard,
  FaBirthdayCake,
  FaLock,
  FaUser,
  FaPhone,
  FaTransgenderAlt,
  FaHome,
} from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ImBin2 } from "react-icons/im";
import {
  MdEmail,
  MdOutlineTransgender,
  MdSwitchAccount,
  MdPassword,
} from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";

//date variables
const today = dayjs();
const minDate = today.subtract(100, "year");

// Gender options
const gender = ["Male", "Female", "Other"];
const genderMapping = {
  0: "Male",
  1: "Female",
  2: "Other",
};

//custom
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    fontSize: "0.875rem",
    color: "#1BAA64 !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#1BAA64",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1BAA64 !important",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 16px",
    fontSize: "1rem",
  },
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& button": {
    outline: "none",
  },
  "& label": {
    fontSize: "0.875rem",
    color: "#1BAA64 !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#1BAA64 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1BAA64 !important",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 16px",
    fontSize: "1rem",
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px !important",
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D1D5DB",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 16px",
    fontSize: "1rem",
    borderRadius: "10px !important",
  },
  "& .MuiSelected": {
    fontSize: "1rem !important",
  },
  textAlign: "left",
  height: "49px",
  borderRadius: "10px !important",
}));

function AccountProfile() {
  //hooks
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  //functions

  //edit profile
  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  //update profile
  const handleUpdateProfile = () => {};

  //edit pass
  const handleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
  };

  //update pass
  const handleUpdatePassword = () => {};

  return (
    <>
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
        <h1 className="text-left w-full text-[1.25rem] font-bold mb-[3.2rem] text-[#2F3645]">
          Profile
        </h1>
        <div className="w-full mb-[3.2rem]">
          <div className="flex justify-between gap-[1rem] items-center mb-[1.2rem]">
            <div className="flex justify-between gap-[1rem] items-center">
              <FaAddressCard style={{ color: "#2F3645", fontSize: "1.4rem" }} />
              <h1 className="text-[1rem] text-left font-bold text-[#2F3645]">
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

          <Grid2 container columnSpacing={4} rowSpacing={8} marginTop={8}>
            <Grid2 size={6}>
              <CustomTextField
                label="Email"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <MdEmail style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <CustomTextField
                label="Username"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <MdSwitchAccount style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <CustomTextField
                label="Full Name"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <FaUser style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomDatePicker
                  disabled={!isEditProfile}
                  label="Date of Birth"
                  onChange={(newValue) => setUserBirthDate(newValue)}
                  minDate={minDate}
                  maxDate={today}
                  slotProps={{
                    textField: {
                      InputProps: {
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ ml: "0.4rem" }}
                          >
                            <FaBirthdayCake style={{ color: "#44494D" }} />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    fontSize: "0.875rem !important",
                    color: "rgba(0, 0, 0, 0.38)",
                  }}
                >
                  Gender
                </InputLabel>
                <CustomSelect
                  disabled={!isEditProfile}
                  labelId="gender-select-label"
                  id="gender-select"
                  placeholder={"Gender"}
                  label="Gender"
                  onChange={() => {}}
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                      <FaTransgenderAlt style={{ color: "#44494D" }} />
                    </InputAdornment>
                  }
                >
                  {gender.map((g, index) => (
                    <MenuItem key={index} value={g}>
                      {g}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <CustomTextField
                label="Phone Number"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <FaPhone style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={12}>
              <CustomTextField
                label="Address"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <GoHomeFill style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </div>
      </Paper>

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
          marginTop: "2rem",
        }}
      >
        <h1 className="text-left w-full text-[1.25rem] font-bold mb-[3.2rem] text-[#2F3645]">
          Password
        </h1>
        <div className="w-full mb-[3.2rem]">
          <div className="flex justify-between gap-[1rem] items-center mb-[1.2rem]">
            <div className="flex justify-between gap-[1rem] items-center">
              <FaLock style={{ color: "#2F3645", fontSize: "1.4rem" }} />
              <h1 className="text-[1rem] text-left font-bold text-[#2F3645]">
                Change Password
              </h1>
            </div>
            {!isEditPassword ? (
              <div className="flex justify-center gap-4 profileButton">
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditPassword}
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
                  onClick={handleEditPassword}
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
                  onClick={handleUpdatePassword}
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

          <Grid2 container columnSpacing={4} rowSpacing={0} marginTop={8}>
            <Grid2 size={6}>
              <CustomTextField
                label="New Password"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditPassword}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <PiPasswordFill style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <CustomTextField
                label="Confirm Password"
                variant="outlined"
                value={""}
                fullWidth
                disabled={!isEditPassword}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <PiPasswordFill style={{ color: "#44494D" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </div>
      </Paper>
    </>
  );
}

export default AccountProfile;
