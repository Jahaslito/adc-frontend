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
import { ProtectedRoute } from "./util/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/staff/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<PatientLogin />} />
                <Route path="/register" element={<Register />} />

                {/**
                 * This is a protected route that needs auth
                 */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    }
                />

                {/* </Route> */}
                {/* <Route path="/*" element={<Main />} /> */}
                <Route
                    path="/staff_verification"
                    element={<StaffVerification />}
                />
                <Route
                    path="/staff_registration"
                    element={<StaffRegistration />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
