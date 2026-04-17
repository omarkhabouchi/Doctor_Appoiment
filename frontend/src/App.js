// import './App.css';

import AddAppointment from "./pages/AddAppointment";
import AddDoctor from "./pages/AddDoctor";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

// ✅ ADD TOASTIFY IMPORTS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* ✅ TOAST CONTAINER (IMPORTANT) */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </>
  );
}

export default App;
