import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import BreadCrumbs from "../components/BreadCrumbs";
import Doctor from "./Doctor";

const Main = () => {
    return (
        <div className="w-full flex flex-col items-center p-3 bg-gray-100">
            <Navbar />
            <BreadCrumbs />
            <div className="p-6 flex-grow w-8/12 shadow bg-white">
                <Routes>
                    {/*Define routes here*/}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/doctor" element={<Doctor />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
