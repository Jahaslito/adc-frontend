import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import BreadCrumbs from "../components/BreadCrumbs";
import Doctor from "./Doctor";
import Patient from "./Patient";
import Patients from "./Patients";
import Research from "./Research";
import PatientVisits from "./PatientVisits";
import Appointments from "./Appointments";
import VitalSigns from "./VitalSigns";

const Main = () => {
    return (
        <div className="w-full flex flex-col items-center p-3 bg-gray-100">
            <Navbar />
            <BreadCrumbs />
            <div className="p-6 flex-grow w-8/12 shadow bg-white">
                <Routes>
                    {/*Define routes here. Also for breadcrumb add the to the routes array in BreadCrumbs.jsx*/}
                    <Route path="/*" element={<Dashboard />} />
                    <Route path="doctor" element={<Doctor />} />
                    <Route path="me" element={<Patient />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="patientvisits" element={<PatientVisits />} />
                    <Route path="appoint" element={<Appointments />} />
                    <Route path="research" element={<Research />} />
                    <Route path="vitals" element={<VitalSigns />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
