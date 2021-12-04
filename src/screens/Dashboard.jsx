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
import Input from "../components/Input";

const Dashboard = () => {
    const [modules, setModules] = useState([
        {
            label: "Patients and Visits",
            icon: <AiOutlineUsergroupAdd size={70} color={colors.primary} />,
        },
        {
            label: "Vital Signs",
            icon: <FaHeartbeat size={70} color={colors.primary} />,
        },
        {
            label: "Pharmacy",
            icon: <MdOutlineLocalPharmacy size={70} color={colors.primary} />,
        },
        {
            label: "Doctor",
            icon: <GiStethoscope size={70} color={colors.primary} />,
        },
        {
            label: "Appointments",
            icon: <IoCalendarOutline size={70} color={colors.primary} />,
        },
        {
            label: "Laboratory",
            icon: <ImLab size={70} color={colors.primary} />,
        },
    ]);
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row justify-between items-center p-2">
                <span className="text-xl">Modules</span>
                <Input placeholder="Search modules" styles_="text-sm" noLabel />
            </div>
            {/* List of modules */}
            <div className="p-4 flex flex-row gap-6 flex-wrap justify-evenly content-center">
                {modules.map((module, index) => (
                    <CardButton
                        label={module.label}
                        key={index}
                        icon={module.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
