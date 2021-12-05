import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Main from "./screens/Main";
import Register from "./screens/Register";
import StaffVerification from "./screens/StaffVerification";
import StaffRegistration from "./screens/StaffRegistration";

import { AppContext } from "./util/AppContext";

function App() {
    const { user } = useContext(AppContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Main />} />
                <Route path="/staffVerification" element={<StaffVerification />} />
                <Route path="/staffRegistration" element={<StaffRegistration />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
