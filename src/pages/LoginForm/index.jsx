/* eslint-disable react/prop-types */
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import InputField from "../../components/InputField";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/OnlyLogo.png";
function LoginForm({ onClose, onOpenRoleSelection }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-10 rounded-3xl relative shadow-lg w-[720px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 text-[#1BAA64] right-4 text-xl"
        >
          &times; {/* X Symbol */}
        </button>

        {/* Logo and Welcome Message */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-[78px] h-[88px] mb-[2.5rem]"
          />
          <h2 className="text-4xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 mt-1">
            Please choose your sign in method
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Google Sign In Button */}
          <div className="flex justify-between gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              <FaGoogle className="text-xl" style={{ color: "#4285F4" }} />
              Google
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

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

          {/* Forgot Password */}
          <div className="flex justify-end mt-3">
            <a
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Do not have an account?{" "}
          <button
            type="button"
            onClick={onOpenRoleSelection}
            className="text-green-500 hover:text-green-700 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
