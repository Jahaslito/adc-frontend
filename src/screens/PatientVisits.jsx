import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { AiOutlineUserAdd } from "react-icons/ai";
import { colors } from "../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import { MdSave } from "react-icons/md";
import { HiEye } from "react-icons/hi";

const PatientVisits = () => {
    const cols = [
        "Name",
        "Gender",
        "Phone",
        "Email",
        "Address",
        "Date",
        "Action",
    ];
    const rows = [
        [
            "Michael Owen",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, dalton Rd",
            "12/02/2021",
            <Button
                label="View"
                icon={<HiEye size={20} color={colors.primary} />}
            />,
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
            "1/12/2021",
            <Button
                label="View"
                icon={<HiEye size={20} color={colors.primary} />}
            />,
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
            "10/12/2021",
            <Button
                label="View"
                icon={<HiEye size={20} color={colors.primary} />}
            />,
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
            "16/9/2021",
            <Button
                label="View"
                icon={<HiEye size={20} color={colors.primary} />}
            />,
        ],
    ];
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-light">Patient Visits</span>
                <Input
                    placeholder="Search patients"
                    styles_="text-sm"
                    noLabel
                />
            </div>
            <div className="mt-6">
                <Table cols={cols} rows={rows} />
            </div>
        </div>
    );
};

export default PatientVisits;
