/* eslint-disable react/prop-types */
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import InputField from "../../components/InputField";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/OnlyLogo.png";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import authApiInstance from "../../utils/ApiInstance/authApiInstance";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Import toast styles

function setCookie(name, value, expiresIn) {
  var now = new Date();
  var time = now.getTime() + 7 * 60 * 60 * 1000;
  var expireTime = time + 1000 * expiresIn;
  now.setTime(expireTime);
  const cookieString = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

function LoginForm({ onClose, onOpenRoleSelection, onOpenForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      email: email,
      password: password,
    };

    const notify = (message) => {
      toast.warn(message, {
        position: "top-right", // Positioning the toast
        autoClose: 3000, // Auto close after 3 seconds
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#ffffff", // Custom background color for warning
          color: "#000000", // Custom text color for warning
        },
      });
    };

    authApiInstance
      .post("/login", jsonData)
      .then((res) => {
        if (!res.data._isSuccess) {
          notify(`${res.data._message[0] || "Login failed"}`);
          console.log("Login failed:", res.data._message);
        } else {
          const decodedToken = jwtDecode(res.data._data);
          const userRole = decodedToken.role;

          signIn({
            auth: {
              token: res.data._data,
              type: "Bearer",
            },
            expiresIn: 3600,
            tokenType: "Bearer",
            userState: { email: jsonData.email, role: userRole },
          });
          onClose();
          Swal.fire({
            title: "Success",
            text: "Login successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            willOpen: () => {
              // Add custom styles
              const popup = Swal.getPopup();
              popup.style.backgroundColor = "#ffffff"; // Custom background color
              popup.style.color = "#000000"; // Custom text color
              popup.style.borderRadius = "10px"; // Custom border radius
              popup.style.padding = "20px"; // Custom padding
            },
            customClass: {
              popup: "custom-swal-popup", // Custom class for the popup
              title: "custom-swal-title", // Custom class for the title
              icon: "custom-swal-icon", // Custom class for the icon
              htmlContainer: "custom-swal-html", // Custom class for the content
            },
          }).then(() => {
            // This will execute after Swal closes
            navigate("/home");
          });

          setCookie("_auth", Cookies.get("_auth"), 3600);
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage =
            error.response.data.message || "Invalid login details.";
          notify(`${errorMessage}`);
          console.log("Error response:", error.response);
        } else if (error.request) {
          notify("No response from server. Please try again.");
          console.log("Request error:", error.request);
        } else {
          notify("An error occurred. Please try again.");
          console.log("Error:", error.message);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="py-10 px-10 bg-white rounded-3xl relative shadow-lg w-[45rem]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1BAA64] text-xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-[4.875rem] h-[5.5rem] mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-1.5">
            Welcome back
          </h2>
          <p className="text-gray-500 mt-1">
            Please choose your sign in method
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 rounded-md shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              <FaGoogle className="text-xl" style={{ color: "#4285F4" }} />
              Google
            </button>
          </div>

          <div className="flex items-center justify-center my-4">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-4">
            <InputField
              label="Email"
              name="email"
              id="email-input"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />

            <InputField
              label="Password"
              id="password-input"
              name="password"
              startIcon={<HttpsIcon />}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              isPassword={true}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          <div className="flex justify-end mt-[1rem]">
            <button
              onClick={onOpenForgotPassword}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}

export default LoginForm;
