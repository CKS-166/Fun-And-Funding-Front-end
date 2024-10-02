/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

// Reusable InputWithIcon component
export default function InputField({
  label = "Input", // Default label
  id = "outlined-adornment-input", // Default id
  startIcon = <MailOutlineIcon />, // Default start icon
  iconStyles = {}, // Custom icon styles
  inputProps = {}, // Additional input props
  formControlStyles = {}, // Custom FormControl styles
  value, // Value of the input
  onChange, // onChange handler
  isPassword = false, // Flag to check if this is a password input
}) {
  const [showPassword, setShowPassword] = React.useState(false); // State to track visibility

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handle mouse down on visibility icon (prevent default behavior)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl sx={{ m: 1, ...formControlStyles }}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          type={isPassword && !showPassword ? "password" : "text"} // Switch between 'password' and 'text'
          startAdornment={
            <InputAdornment position="start">
              <span style={iconStyles}>{startIcon}</span>
            </InputAdornment>
          }
          endAdornment={
            isPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      </FormControl>
    </>
  );
}
