import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApiInstace from "../../utils/ApiInstance/userApiInstance";
// import { Modal as BaseModal, Modal } from "@mui/base/Modal";
import {
  ArrowForward,
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FaAddressCard,
  FaBirthdayCake,
  FaLock,
  FaTransgenderAlt,
  FaUser,
} from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ImBin2 } from "react-icons/im";
import { MdEmail, MdSwitchAccount } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { RiProfileFill } from "react-icons/ri";
import QuillEditor from "../../components/AccountProfile/QuillEditor";

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

  //user profile
  const [selectedGender, setSelectedGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userBio, setUserBio] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowChangedPassword, setIsShowChangedPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  //password
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //avatar
  const [avatar, setAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState(null);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const token = Cookies.get("_auth");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4OWJmMjFkLTlmOTQtNDY2OS04MzdiLTdkNThmMjE4Y2EzZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJEbyBZb28gTGltIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZG95b29saW1AZ21haWwuY29tIiwianRpIjoiSmNtRjh1ajJJU3ZlTDVGdnZOazRwbnA4eHJoSU56OC0xNjE0MjI1NjI0IiwiYXBpX2tleSI6IkpjbUY4dWoySVN2ZUw1RnZ2Tms0cG5wOHhyaElOejgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJCYWNrZXIiLCJleHAiOjE3Mjg5MTk4MDgsImlzcyI6IkFQUE9UQVBBWSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzIzNSJ9.qR99g7vFzi0Cs2lIcvON3ei0bfucUm3NNBBLz4WgAxM";

  //functions

  //edit profile
  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  //update profile
  const handleUpdateProfile = () => {
    // setIsLoading(true);

    const userUpdateRequest = {
      fullName: accountName,
      userName: userName,
      userPhone: userPhone,
      dayOfBirth:
        userBirthDate == null
          ? null
          : `${userBirthDate.get("year")} - ${
              userBirthDate.get("month") + 1 < 10
                ? `0${userBirthDate.get("month") + 1}`
                : userBirthDate.get("month") + 1
            } - ${userBirthDate.get("date")}`,
      address: userAddress,
      gender: Object.keys(genderMapping).find(
        (key) => genderMapping[key] === selectedGender
      ),
      bio: userBio,
      userStatus: user.userStatus,
    };

    //fetch update profile api
    userApiInstace
      .patch("/info", userUpdateRequest, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Update profile successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setTimeout();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Update profile failed.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setTimeout();
          });
        }
      })
      .catch((error) => {
        console.error("Update profile failed:", error);
      })
      .finally(() => {
        setIsEditProfile(false);
        // setIsLoading(false);
      });
  };

  //edit pass
  const handleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
  };

  //validate pass
  const handleValidatePassword = async () => {
    try {
      const response = await userApiInstace.get(
        `/password?password=${password}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        handleClose();
        setIsEditPassword(true);
      }
    } catch (error) {
      if (error.response) {
        // Logs the error response object to inspect it.
        console.log(error.response);

        if (error.response.status === 400) {
          handleClose();

          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
            showConfirmButton: true,
          });
        }
      } else {
        console.error("Validate password failed: ", error);
      }
    }
  };

  //update pass
  const handleUpdatePassword = async () => {
    try {
      //request
      const request = {
        oldPassword: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      //response
      const response = await userApiInstace.patch("/password", request, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Update password successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsEditPassword(false);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");

          navigate("/home");
        });
      }
    } catch (error) {
      if (error.response) {
        // Logs the error response object to inspect it.
        console.log(error.response);

        if (error.response.status === 400) {
          handleClose();

          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
            showConfirmButton: true,
          });
        }
      } else {
        console.error("Update password failed: ", error);
      }
    }
  };

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
        headers: { Authorization: `Bearer ${token}` },
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
          userData.dayOfBirth ? dayjs(userData.dayOfBirth) : null
        );
        setUserBio(userData.bio || "");
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
                value={userEmail}
                fullWidth
                disabled={true}
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
                value={userName}
                fullWidth
                disabled={!isEditProfile}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
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
                value={accountName}
                fullWidth
                disabled={!isEditProfile}
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
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
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                  }}
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
                value={userAddress}
                fullWidth
                disabled={!isEditProfile}
                onChange={(e) => {
                  setUserAddress(e.target.value);
                }}
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
            <Grid2 size={12} marginBottom={6}>
              <div className="flex gap-[1rem] items-center mb-16">
                <RiProfileFill
                  style={{ color: "#2F3645", fontSize: "1.4rem" }}
                />
                <h1 className="text-[1rem] text-left font-bold text-[#2F3645]">
                  Bio
                </h1>
              </div>
              <QuillEditor
                className="w-full !important"
                value={userBio}
                data={userBio}
                setData={setUserBio}
                isEnabled={isEditProfile}
                onChange={(e) => {
                  setUserBio(e.target.value);
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
                  onClick={handleOpen}
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
                required={true}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                type={isShowConfirmPassword ? "text" : "password"}
                fullWidth
                disabled={!isEditPassword}
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex", // Enable Flexbox on the Modal itself
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Ensure items stack vertically
            justifyContent: "center", // Center content within the box
            alignItems: "center", // Center content within the box
            height: "40vh",
            padding: 8,
            backgroundColor: "#F5F7F8",
            margin: "auto",
            width: "45%",
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "1.5rem",
              color: "#2F3645",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Enter your password to continue
          </Typography>

          <Grid2
            container
            columnSpacing={4}
            rowSpacing={0}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid2 size={9}>
              <CustomTextField
                label="Password"
                variant="outlined"
                type={isShowPassword ? "text" : "password"}
                sx={{ width: "100%" }}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: "0.4rem" }}>
                        <IconButton
                          sx={{ outline: "none !important" }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={3}>
              <Button
                variant="text"
                endIcon={<ArrowForward />}
                onClick={handleValidatePassword}
                sx={{
                  color: "#2F3645",
                  backgroundColor: "#F5F7F8",
                  textTransform: "none !important",
                  "&:hover": {
                    color: "#1BAA64",
                  },
                  "&:active": {
                    outline: "none !important",
                  },
                  "&:focus": {
                    outline: "none !important",
                  },
                  fontWeight: "bold",
                  height: "51px",
                }}
              >
                Continue
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </>
  );
}

export default AccountProfile;
