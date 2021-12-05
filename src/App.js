import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import PatientLogin from "./screens/patient/Login";
import Main from "./screens/Main";
import Register from "./screens/Register";
import StaffVerification from "./screens/StaffVerification";
import StaffRegistration from "./screens/StaffRegistration";

import { AppContext } from "./util/AppContext";
import LandingPage from "./screens/LandingPage";

function App() {
    const { user } = useContext(AppContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/patient/login" element={<PatientLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Main />} />
                <Route path="/staffVerification" element={<StaffVerification />} />
                <Route path="/staffRegistration" element={<StaffRegistration />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
