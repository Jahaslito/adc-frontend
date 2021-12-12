import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { colors } from "../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import { MdSave } from "react-icons/md";
import { MdHistoryToggleOff } from "react-icons/md";
import Calendar from "../components/Calendar";

const Appointments = () => {
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-light">Appointments</span>
                <Input
                    placeholder="Search patients"
                    styles_="text-sm"
                    noLabel
                />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <Calendar />
            </div>
        </div>
    );
};

export default Appointments;
