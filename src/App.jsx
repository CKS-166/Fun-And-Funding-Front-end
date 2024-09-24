import { useState } from 'react'
import './App.css'
import './index.css'
import ProjectDetail from './pages/ProjectDetail'
import FunFundingAppBar from './components/AppBar'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/300.css"; // Specify weight
import "@fontsource/poppins/300-italic.css"; // Specify weight and style
import { Navigate, Route, Routes } from 'react-router';
import CreateFundingProjectLayout from './layouts/CreateFundingProjectLayout'
import Introduction from './pages/CreateFundingProjectForm/Introduction'
import ProjectMedia from './pages/CreateFundingProjectForm/ProjectMedia'
import SetupBankAccount from './pages/CreateFundingProjectForm/SetupBankAccount'
import SetupDonatePackage from './pages/CreateFundingProjectForm/SetupDonatePackage'
import ChoosePlan from './pages/CreateFundingProjectForm/ChoosePlan'
import BasicInfo from './pages/CreateFundingProjectForm/BasicInfo'
function App() {

  return (
    <>
      <FunFundingAppBar />

      <Routes>
        <Route path='choose-project-plan' element={<ChoosePlan />} />
        <Route element={<CreateFundingProjectLayout />}>
          <Route path='request-funding-project/basic-info' element={<BasicInfo />} />
          <Route path='request-funding-project/introduction' element={<Introduction />} />
          <Route path='request-funding-project/project-media' element={<ProjectMedia />} />
          <Route path='request-funding-project/setup-bank-account' element={<SetupBankAccount />} />
          <Route path='request-funding-project/setup-donate-package' element={<SetupDonatePackage />} />
        </Route>

        <Route path='/funding-detail' element={<ProjectDetail />} />

        <Route path='*' element={<Navigate to='/funding-detail' />} />
      </Routes>
    </>
  )
}

export default App
