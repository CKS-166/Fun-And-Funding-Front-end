import "@fontsource/poppins";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/300.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import UserLayout from "./layouts/UserLayout";
import AboutUs from './pages/AboutUs';
import HomePage from "./pages/HomePage";
import ProjectDetail from './pages/ProjectDetail';
import './index.css'
import CreateFundingProjectLayout from './layouts/CreateFundingProjectLayout'
import Introduction from './pages/CreateFundingProjectForm/Introduction'
import ProjectMedia from './pages/CreateFundingProjectForm/ProjectMedia'
import SetupBankAccount from './pages/CreateFundingProjectForm/SetupBankAccount'
import SetupDonatePackage from './pages/CreateFundingProjectForm/SetupDonatePackage'
import ChoosePlan from './pages/CreateFundingProjectForm/ChoosePlan'
import BasicInfo from './pages/CreateFundingProjectForm/BasicInfo'
import FunFundingAppBar from "./components/AppBar";
import TestCR from './pages/TestCR';
import TestDetail from './pages/TestDetail';
import TestUpdate from "./pages/TestCR/testUpdate";
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

        <Route path='choose-project-plan' element={<ChoosePlan />} />
        <Route element={<CreateFundingProjectLayout />}>
          <Route path='request-funding-project/basic-info' element={<BasicInfo />} />
          <Route path='request-funding-project/introduction' element={<Introduction />} />
          <Route path='request-funding-project/project-media' element={<ProjectMedia />} />
          <Route path='request-funding-project/setup-bank-account' element={<SetupBankAccount />} />
          <Route path='request-funding-project/setup-donate-package' element={<SetupDonatePackage />} />
        </Route>

        <Route path='/funding-detail' element={<ProjectDetail />} />
        <Route path='/test' element={<TestCR/>}/>
        <Route path='/test-update' element={<TestUpdate/>}/>

         <Route path='/test-detail' element={<TestDetail/>}/>
        <Route path='*' element={<Navigate to='/funding-detail' />} />
      </Routes>
    </>
  )
}

export default App
