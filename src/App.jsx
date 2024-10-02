import "@fontsource/poppins";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FunFundingAppBar from "./components/AppBar";
import "./index.css";
import CreateFundingProjectLayout from "./layouts/CreateFundingProjectLayout";
import PublicProfileLayout from "./layouts/ProfileLayout/PublicProfileLayout";
import UserProfileLayout from "./layouts/ProfileLayout/UserProfileLayout";
import UserLayout from "./layouts/UserLayout";
import AboutUs from "./pages/AboutUs";
import AccountProfile from "./pages/AccountProfile";
import AccountProject from "./pages/AccountProject";
import BasicInfo from "./pages/CreateFundingProjectForm/BasicInfo";
import ChoosePlan from "./pages/CreateFundingProjectForm/ChoosePlan";
import Introduction from "./pages/CreateFundingProjectForm/Introduction";
import ProjectMedia from "./pages/CreateFundingProjectForm/ProjectMedia";
import SetupBankAccount from "./pages/CreateFundingProjectForm/SetupBankAccount";
import SetupDonatePackage from "./pages/CreateFundingProjectForm/SetupDonatePackage";
import HomePage from "./pages/HomePage";
import ProjectDetail from "./pages/ProjectDetail";
import PublicProfile from "./pages/PublicProfile";
import TestCR from "./pages/TestCR";
import TestUpdate from "./pages/TestCR/testUpdate";
import TestDetail from "./pages/TestDetail";
function App() {
  return (
    <>
      <FunFundingAppBar />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
        </Route>

        <Route path="choose-project-plan" element={<ChoosePlan />} />
        <Route element={<CreateFundingProjectLayout />}>
          <Route
            path="request-funding-project/basic-info"
            element={<BasicInfo />}
          />
          <Route
            path="request-funding-project/introduction"
            element={<Introduction />}
          />
          <Route
            path="request-funding-project/project-media"
            element={<ProjectMedia />}
          />
          <Route
            path="request-funding-project/setup-bank-account"
            element={<SetupBankAccount />}
          />
          <Route
            path="request-funding-project/setup-donate-package"
            element={<SetupDonatePackage />}
          />
        </Route>

        <Route path="/funding-detail/:id" element={<ProjectDetail />} />
        <Route path="/test" element={<TestCR />} />
        <Route path="/test-update" element={<TestUpdate />} />

        <Route path="/test-detail" element={<TestDetail />} />
        <Route path="*" element={<Navigate to="/funding-detail" />} />

        <Route element={<UserProfileLayout />}>
          <Route path="/account/profile" element={<AccountProfile />} />
          <Route path="/account/projects" element={<AccountProject />} />
        </Route>
        <Route element={<PublicProfileLayout />}>
          <Route path="/profile" element={<PublicProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
