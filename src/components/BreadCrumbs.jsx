import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = () => {
    return (
        <div className="w-8/12 p-3 text-xs font-medium text-gray-600">
            <Link to="dashboard">Dashboard</Link>
        </div>
    );
};

export default BreadCrumbs;
