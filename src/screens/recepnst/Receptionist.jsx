import React from "react";
import { Routes, Route } from "react-router-dom";
import Patients from "./Patients";
import Patient from "../Patient";

const Receptionist = () => {
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b mb-4">
                <span className="text-lg font-light">Patients</span>
            </div>

            <Routes>
                {/*Define routes here. Also for breadcrumb add the to the routes array in BreadCrumbs.jsx*/}
                <Route path="/" element={<Patients />} />
                <Route path=":id" element={<Patient />} />
            </Routes>
        </div>
    );
};

export default Receptionist;
