import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { user } = useContext(AppContext);

    return user ? <Outlet /> : <Navigate to="/landing" />;
};
