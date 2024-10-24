import "@fontsource/poppins";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import FunFundingAppBar from "./components/AppBar";
import "./index.css";
import CreateFundingProjectLayout from "./layouts/CreateFundingProjectLayout";
import PublicProfileLayout from "./layouts/ProfileLayout/PublicProfileLayout";
import UserProfileLayout from "./layouts/ProfileLayout/UserProfileLayout";
import UpdateFundingProjectLayout from "./layouts/UpdateFundingProjectLayout";
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
//test api
import TestMileReq from "./pages/TestCR/testMileReq";
import TestUpdate from "./pages/TestCR/testUpdate";
import TestUpdateReq from "./pages/TestCR/testUpdateReq";
import TestDetail from "./pages/TestDetail";

import BankAccount from "./pages/UpdateFundingProjectForm/ProjectEditor/BankAccount";
import BasicInformation from "./pages/UpdateFundingProjectForm/ProjectEditor/BasicInformation";
import DonationPackages from "./pages/UpdateFundingProjectForm/ProjectEditor/DonationPackages";
import Media from "./pages/UpdateFundingProjectForm/ProjectEditor/Media";
import Milestone1 from "./pages/UpdateFundingProjectForm/ProjectMilestone/Milestone1";
import Milestone2 from "./pages/UpdateFundingProjectForm/ProjectMilestone/Milestone2";
import Milestone3 from "./pages/UpdateFundingProjectForm/ProjectMilestone/Milestone3";
import Milestone4 from "./pages/UpdateFundingProjectForm/ProjectMilestone/Milestone4";
import ProjectPreview from "./pages/UpdateFundingProjectForm/ProjectPreview";
import MilestoneForm from "./pages/TestCR/MilestoneForm";
import AccountWallet from "./pages/AccountWallet"
import Chat from "./pages/Chat";

//context
import { ChatProvider } from "./contexts/ChatContext";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import Dashboard from "./pages/AdminPages/Dashboard";


function App() {
  const location = useLocation()
  const hideAppBar = location.pathname.includes("admin-dashboard")

  return (
    <>
      {!hideAppBar && <FunFundingAppBar />}
      <ChatProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="*" element={<Navigate to="/home" />} />
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

          <Route element={<UpdateFundingProjectLayout />}>
            <Route
              path="/account/projects/update/:id/preview"
              element={<ProjectPreview />}
            />

            <Route
              path="/account/projects/update/:id/basic-info"
              element={<BasicInformation />}
            />
            <Route
              path="/account/projects/update/:id/bank-account"
              element={<BankAccount />}
            />
            <Route
              path="/account/projects/update/:id/donation-packages"
              element={<DonationPackages />}
            />
            <Route
              path="/account/projects/update/:id/media-files"
              element={<Media />}
            />

            <Route
              path="/account/projects/update/:id/milestone1"
              element={<Milestone1 />}
            />
            <Route
              path="/account/projects/update/:id/milestone2"
              element={<Milestone2 />}
            />
            <Route
              path="/account/projects/update/:id/milestone3"
              element={<Milestone3 />}
            />
            <Route
              path="/account/projects/update/:id/milestone4"
              element={<Milestone4 />}
            />
          </Route>

          <Route element={<AdminDashboardLayout />}>
            <Route path="/admin-dashboard/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/funding-detail/:id" element={<ProjectDetail />} />
          <Route path="/test" element={<TestCR />} />
          <Route path="/test-update" element={<TestUpdate />} />
          <Route path="/test-mile-req" element={<TestMileReq />} />
          <Route path="/test-update-req" element={<TestUpdateReq />} />
          <Route path="/funding-project/:id" element={<ProjectDetail />} />
          <Route path="/test" element={<TestCR />} />
          <Route path="/test-update" element={<TestUpdate />} />
          <Route path="/test-mile-req" element={<TestMileReq />} />
          <Route path="/test-update-req" element={<TestUpdateReq />} />

          <Route path="/test-detail" element={<TestDetail />} />
          <Route path="/test-milestone-form" element={<MilestoneForm />} />
          <Route element={<UserProfileLayout />}>
            <Route path="/account/profile" element={<AccountProfile />} />
            <Route path="/account/projects" element={<AccountProject />} />
          </Route>
          <Route element={<PublicProfileLayout />}>
            <Route path="/profile/:id" element={<PublicProfile />} />
          </Route>

          <Route path="/chat/:senderId/:receiverId" element={<Chat />} />
        </Routes>
      </ChatProvider>
    </>
  );
}

export default App;
