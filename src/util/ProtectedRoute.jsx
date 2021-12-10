import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const auth = null;
    return auth ? <Outlet /> : <Navigate to="/landing" />;
};
