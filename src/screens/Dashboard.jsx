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
            roles: ["Receptionist", "Doctor", "Nurse"],
            icon: <AiOutlineUsergroupAdd size={70} color={colors.primary} />,
        },
        {
            label: "Vital Signs",
            path: "vitals",
            roles: ["Nurse"],
            icon: <FaHeartbeat size={70} color={colors.primary} />,
        },
        {
            label: "Doctor",
            path: "doctor",
            roles: ["Doctor"],
            icon: <GiStethoscope size={70} color={colors.primary} />,
        },
        {
            label: "Appointments",
            path: "appoint",
            roles: ["Receptionist", "Doctor", "Patient"],
            icon: <IoCalendarOutline size={70} color={colors.primary} />,
        },

        {
            label: "Laboratory",
            path: "lab",
            roles: ["Lab technician"],
            icon: <ImLab size={70} color={colors.primary} />,
        },
        {
            label: "Virtual Consultation",
            path: "vconsul",
            roles: ["Receptionist", "Doctor", "Patient"],
            icon: <BsCameraVideo size={70} color={colors.primary} />,
        },
        {
            label: "Medical Records",
            path: `me${user.id}`,
            roles: ["Patient"],
            icon: <AiOutlineFileText size={70} color={colors.primary} />,
        },

        {
            label: "Research",
            path: "research",
            roles: ["Receptionist", "Doctor", "Nurse", "Lab technician"],
            icon: <IoSearchOutline size={70} color={colors.primary} />,
        },
    ]);
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row justify-between items-center px-3 pb-2 border-b">
                <span className="text-lg font-light">Modules</span>
            </div>
            {/* List of modules */}
            <div className="p-4 grid grid-flow-row grid-cols-3 gap-x-20 gap-y-10 m-auto">
                {modules.map((module, index) => {
                    // module.roles.find(user.role)
                    if (module.roles.find((elem) => elem === user.role)) {
                        return (
                            <Link to={module.path} key={index}>
                                <CardButton
                                    label={module.label}
                                    icon={module.icon}
                                />
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Dashboard;
