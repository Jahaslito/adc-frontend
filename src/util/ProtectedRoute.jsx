import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext);

    return user ? children : <Navigate to="/landing" />;
};
