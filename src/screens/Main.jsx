import React, { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import BreadCrumbs from "../components/BreadCrumbs";
import Doctor from "./doctor/Doctor";
import Patient from "./Patient";
import Research from "./Research";
import Appointments from "./Appointments";
import VitalSigns from "./nurse/Nurse";
import Lab from "./Lab";
import PageWideSpinner from "../components/PageWideSpinner";
import { AppContext } from "../util/AppContext";
import Receptionist from "./recepnst/Receptionist";
import Alert from "../components/Alert";

const Main = () => {
    const { loaderHidden, alerts } = useContext(AppContext);
    return (
        <>
            <PageWideSpinner hidden={loaderHidden} />
            <div
                className="fixed left-1 w-56 h-screen flex flex-col gap-2 py-1 px-2"
                style={{ top: 124 }}
            >
                {alerts.map((alert, key) => {
                    return (
                        <Alert
                            key={key}
                            label={alert.message}
                            theme={alert?.theme}
                            timeout={alert.timeout}
                            extra={alert.extra}
                        />
                    );
                })}
            </div>
            <div className="w-full flex flex-col items-center p-3 bg-gray-100">
                <Navbar />
                <BreadCrumbs />
                <div className="p-6 flex-grow w-8/12 shadow bg-white">
                    <Routes>
                        {/*Define routes here. Also for breadcrumb add the to the routes array in BreadCrumbs.jsx*/}
                        <Route path="/*" element={<Dashboard />} />
                        <Route path="doctor/*" element={<Doctor />} />
                        <Route path="vitals/*" element={<VitalSigns />} />
                        <Route path="me" element={<Patient />} />
                        <Route path="appoint/*" element={<Appointments />} />
                        <Route path="patients/*" element={<Receptionist />} />
                        <Route path="appoint" element={<Appointments />} />
                        <Route path="research" element={<Research />} />
                        <Route path="lab" element={<Lab />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Main;
