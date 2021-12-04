import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
const Main = () => {
    return (
        <div className="w-full flex flex-col items-center p-6 bg-gray-100">
            <Navbar />
            <div className="p-6 flex-grow w-8/12 mt-10 shadow-sm bg-white">
                <Routes>
                    {/*Define routes here*/}
                    <Route path="login" element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
