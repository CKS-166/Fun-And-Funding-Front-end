import { useState } from 'react'
import './App.css'
import ProjectDetail from './pages/ProjectDetail'
import FunFundingAppBar from './components/AppBar'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/300.css"; // Specify weight
import "@fontsource/poppins/300-italic.css"; // Specify weight and style
function App() {

  return (
    <>
    <FunFundingAppBar/>
    <ProjectDetail/>
    </>
  )
}

export default App
