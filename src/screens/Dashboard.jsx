import React, { useState, useContext } from "react";
import CardButton from "../components/CardButton";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { ImLab } from "react-icons/im";
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { BsCameraVideo } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AppContext } from "../util/AppContext";

const Dashboard = () => {
    const { user } = useContext(AppContext);
    const [modules, setModules] = useState([
        {
            label: "Patients",
            path: "patients",
            icon: <AiOutlineUsergroupAdd size={70} color={colors.primary} />,
        },
        {
            label: "Vital Signs",
            path: "vitals",
            icon: <FaHeartbeat size={70} color={colors.primary} />,
        },
        {
            label: "Doctor",
            path: "doctor",
            icon: <GiStethoscope size={70} color={colors.primary} />,
        },
        {
            label: "Appointments",
            path: "appoint",
            icon: <IoCalendarOutline size={70} color={colors.primary} />,
        },

        {
            label: "Laboratory",
            path: "lab",
            icon: <ImLab size={70} color={colors.primary} />,
        },
        {
            label: "Virtual Consultation",
            path: "vconsul",
            icon: <BsCameraVideo size={70} color={colors.primary} />,
        },
        {
            label: "Medical Records",
            path: `me${user.id}`,
            icon: <AiOutlineFileText size={70} color={colors.primary} />,
        },

        {
            label: "Research",
            path: "research",
            icon: <IoSearchOutline size={70} color={colors.primary} />,
        },
    ]);
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row justify-between items-center px-3 pb-2 border-b">
                <span className="text-lg font-light">Modules</span>
                <Input placeholder="Search modules" styles_="text-sm" noLabel />
            </div>
            {/* List of modules */}
            <div className="p-4 grid grid-flow-row grid-cols-3 gap-x-20 gap-y-10 m-auto">
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
