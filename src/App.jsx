import { useState } from 'react'
import './App.css'
import ProjectDetail from './pages/ProjectDetail'
import FunFundingAppBar from './components/AppBar'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/300.css"; // Specify weight
import "@fontsource/poppins/300-italic.css"; // Specify weight and style
import { Navigate, Route, Routes } from "react-router-dom";
import TestCR from './pages/TestCR';
import TestDetail from './pages/TestDetail';
function App() {

  return (
    <>
    <Routes>
      <Route path='/test' element={<TestCR/>}/>
      <Route path='/' element={<TestDetail/>} />
    </Routes>

    </>
  )
}

export default App
