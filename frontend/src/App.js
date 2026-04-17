// import './App.css';

import AddAppointment from "./compoments/Addappointment";
import Addappointment from "./compoments/Addappointment";
import Login from "./compoments/Login";
import Navbar from "./compoments/Navbar";
import Register from "./compoments/Register";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
      </Routes>
    </>
  );
}

export default App;
