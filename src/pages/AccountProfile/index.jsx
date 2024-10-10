import {
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaBirthdayCake,
  FaLock,
  FaTransgenderAlt,
  FaUser
} from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ImBin2 } from "react-icons/im";
import {
  MdEmail,
  MdSwitchAccount
} from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { useNavigate } from "react-router";
import userApiInstace from "../../utils/ApiInstance/userApiInstance";

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
  width: "100%",
  height: "100%",
  "& label": {
    fontSize: "0.875rem",
    color: "#1BAA64 !important",
    borderColor: "#1BAA64 !important",
  },
  "& .MuiInputLabel-root": {
    color: "#1BAA64 !important",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px !important",
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
    borderRadius: "10px !important",
    color: "#2F3645 !important",
    borderColor: "#1BAA64 !important",
  },
  "& .MuiSelect-select": {
    color: "#2F3645 !important", // Select text color
  },
  "& .MuiSelect-select.Mui-focused": {
    borderColor: "#1BAA64 !important", // Focused state border color
  },
  "& .MuiSelected": {
    fontSize: "1rem !important",
    borderColor: "#1BAA64 !important",
  },
  textAlign: "left",
  borderRadius: "10px !important",
}));

function AccountProfile() {
  //hooks
  // const { setIsLoading } = useOutletContext();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [user, setUser] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowChangedPassword, setIsShowChangedPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const token = Cookies.get("_auth");

  //functions

  //edit profile
  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  //update profile
  const handleUpdateProfile = () => { };

  //edit pass
  const handleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
  };

  //update pass
  const handleUpdatePassword = () => { };

  //show pass
  const handleClickShowPassword = () => setIsShowPassword((prev) => !prev);
  const handleClickShowChangedPassword = () =>
    setIsShowChangedPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setIsShowConfirmPassword((prev) => !prev);

  //fetch api
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    userApiInstace
      .get("/info", {
        // headers: { Authorization: `Bearer ${token}` },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY0YjQ3MzM1LTg2MjAtNDlhMi1iOGMxLWY0YWYzYTRkOGZkMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJEbyBZb28gTGltIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoicXV5ZGllbTIwMTVAZ21haWwuY29tIiwianRpIjoiSmNtRjh1ajJJU3ZlTDVGdnZOazRwbnA4eHJoSU56OC0xNjE0MjI1NjI0IiwiYXBpX2tleSI6IkpjbUY4dWoySVN2ZUw1RnZ2Tms0cG5wOHhyaElOejgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJCYWNrZXIiLCJleHAiOjE3Mjg1NjQyOTksImlzcyI6IkFQUE9UQVBBWSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzIzNSJ9.xzqIUkSgBNm_uzVx4iu2yQzR7_iVusNPaAEAy7HaHc0`,
        },
      })
      .then((response) => {
        const userData = response.data._data;

        setUser(userData);
        setUserEmail(userData.email || "");
        setAccountName(userData.fullName || "");
        setUserName(userData.userName || "");
        setUserAddress(userData.address || "");
        setSelectedGender(
          userData.gender == null ? "" : genderMapping[userData.gender]
        );
        setUserBirthDate(
          userBirthDate.isValid() ? dayjs(userData.dayOfBirth) : ""
        );
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

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
                value={user?.email || ""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <MdEmail style={{ color: "#2F3645" }} />
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
                value={user?.userName || ""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <MdSwitchAccount style={{ color: "#2F3645" }} />
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
                value={user?.fullName || ""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <FaUser style={{ color: "#2F3645" }} />
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
                  value={userBirthDate}
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
                            <FaBirthdayCake style={{ color: "#2F3645" }} />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth sx={{ height: "100%" }}>
                <InputLabel
                  sx={{
                    fontSize: "0.875rem !important",
                    color: "#1BAA64",
                  }}
                >
                  Gender
                </InputLabel>
                <CustomSelect
                  disabled={!isEditProfile}
                  labelId="gender-select-label"
                  id="gender-select"
                  value={selectedGender || ""}
                  placeholder={"Gender"}
                  label="Gender"
                  onChange={() => { }}
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                      <FaTransgenderAlt style={{ color: "#2F3645" }} />
                    </InputAdornment>
                  }
                  sx={{
                    height: "100%",
                  }}
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
                label="Address"
                variant="outlined"
                value={user?.address || ""}
                fullWidth
                disabled={!isEditProfile}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <GoHomeFill style={{ color: "#2F3645" }} />
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
                type={isShowChangedPassword ? "text" : "password"}
                fullWidth
                disabled={!isEditPassword}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <PiPasswordFill style={{ color: "#2F3645" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: "0.4rem" }}>
                        <IconButton
                          sx={{ outline: "none !important" }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowChangedPassword}
                          edge="end"
                          disabled={!isEditPassword}
                        >
                          {isShowChangedPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
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
                type="password"
                value={""}
                fullWidth
                disabled={!isEditPassword}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                        <PiPasswordFill style={{ color: "#2F3645" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: "0.4rem" }}>
                        <IconButton
                          sx={{ outline: "none !important" }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          disabled={!isEditPassword}
                        >
                          {isShowConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
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
