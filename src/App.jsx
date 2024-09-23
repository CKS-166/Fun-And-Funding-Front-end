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

function App() {

  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
