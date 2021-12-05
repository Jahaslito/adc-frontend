import React, { useState } from "react";
import CardButton from "../components/CardButton";
import Navbar from "../components/Navbar";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { GiStethoscope } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { ImLab } from "react-icons/im";
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Dashboard = () => {
    const [modules, setModules] = useState([
        {
            label: "Patients and Visits",
            path: "/doctor",
            icon: <AiOutlineUsergroupAdd size={70} color={colors.primary} />,
        },
        {
            label: "Vital Signs",
            path: "doctor",
            icon: <FaHeartbeat size={70} color={colors.primary} />,
        },
        {
            label: "Pharmacy",
            path: "doctor",
            icon: <MdOutlineLocalPharmacy size={70} color={colors.primary} />,
        },
        {
            label: "Doctor",
            path: "doctor",
            icon: <GiStethoscope size={70} color={colors.primary} />,
        },
        {
            label: "Appointments",
            path: "doctor",
            icon: <IoCalendarOutline size={70} color={colors.primary} />,
        },
        {
            label: "Laboratory",
            path: "doctor",
            icon: <ImLab size={70} color={colors.primary} />,
        },
    ]);
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row justify-between items-center px-3 pb-2 border-b">
                <span className="text-xl font-heading">Modules</span>
                <Input placeholder="Search modules" styles_="text-sm" noLabel />
            </div>
            {/* List of modules */}
            <div className="p-4 flex flex-row gap-6 flex-wrap justify-evenly content-center">
                {modules.map((module, index) => (
                    <Link to={module.path} key={index}>
                        <CardButton label={module.label} icon={module.icon} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
