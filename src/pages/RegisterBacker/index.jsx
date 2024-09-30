/* eslint-disable react/prop-types */
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import InputField from "../../components/InputField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PortraitIcon from "@mui/icons-material/Portrait";
import logo from "../../assets/OnlyLogo.png";

function BackerForm({ onClose, onOpenLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    onOpenLogin(); // Switch to the LoginForm without closing the dialog
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAccountChange = (e) => setAccountName(e.target.value);
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your form submission logic here
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-10 rounded-3xl relative shadow-lg w-[720px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-[#1BAA64] top-4 right-4 text-xl"
          type="button"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-[#1BAA64] cursor-pointer py-2 px-4 rounded-md transition-all duration-200"
          type="button"
        >
          Back
        </button>
        {/* Logo and Welcome Message */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-[78px] h-[88px] mb-[2.5rem]"
          />
          <h2 className="text-4xl font-bold text-gray-800">
            Create a Backer account
          </h2>
          <p className="text-gray-500 mt-1">
            Browse thousands of games and projects for free
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center w-full space-x-4">
            {/* Account name Input */}
            <div className="w-full">
              <InputField
                label="Account Name"
                startIcon={<PortraitIcon />}
                id="account-input"
                formControlStyles={{ width: "100%" }}
                value={accountName}
                onChange={handleAccountChange}
                placeholder="Enter Account Name"
              />
            </div>

            {/* Full Name Input */}
            <div className="w-full">
              <InputField
                label="Full Name"
                id="fullName-input"
                startIcon={<PersonOutlineIcon />}
                formControlStyles={{ width: "100%" }}
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="Enter Full Name"
              />
            </div>
          </div>

          <div className="w-full">
            {/* Email Input */}
            <InputField
              label="Email"
              id="email-input"
              formControlStyles={{ width: "100%" }}
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />

            {/* Password Input */}
            <InputField
              label="Password"
              id="password-input"
              startIcon={<HttpsIcon />}
              formControlStyles={{ width: "100%" }}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              isPassword={true}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            {/* Confirm Password Input */}
            <InputField
              label="Confirm Password"
              id="confirm-password-input"
              startIcon={<HttpsIcon />}
              formControlStyles={{ width: "100%" }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Enter password"
              isPassword={true}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={handleLoginClick}
            className="text-green-500 hover:text-green-700 cursor-pointer"
            type="button"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackerForm;
