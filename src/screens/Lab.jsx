import React, { useState } from "react";
import CardButton from "../components/CardButton";
import Navbar from "../components/Navbar";
import { BiClipboard } from "react-icons/bi"
import { BiTestTube } from "react-icons/bi"
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Lab = () => {
    const [modules, setModules] = useState([
        {
            label: "Result Type",
            path: "resultTypes",
            icon: <BiTestTube size={70} color={colors.primary} />,
        },
        {
            label: "Lab Results",
            path: "results",
            icon: <BiClipboard size={70} color={colors.primary} />,
        },
    ]);
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row justify-between items-center px-3 pb-2 border-b">
                <span className="text-lg font-light">Modules</span>
                <Input placeholder="Search modules" styles_="text-sm" noLabel />
            </div>
            {/* List of modules */}
            <div className="p-4 flex flex-row gap-y-6 gap-x-20 flex-wrap content-center">
                {modules.map((module, index) => (
                    <Link to={module.path} key={index}>
                        <CardButton label={module.label} icon={module.icon} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Lab;
