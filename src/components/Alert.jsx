import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

/**
 *
 * theme can be `primary`, `red-500` etc.
 * hidden and setHidden ought to be useStates
 */
const Alert = ({ label, theme, hidden, setHidden }) => {
    return (
        <div
            className={`flex flex-row rounded-sm border my-4 border-${theme} ${
                hidden && "hidden"
            }`}
        >
            <div className={`w-1 bg-${theme} rounded-l-sm`}></div>
            <div
                className={`flex flex-row justify-between items-center flex-grow p-3 text-sm font-medium rounded-r-sm text-${theme}`}
            >
                <span>{label}</span>
                <span
                    className={`text-${theme} p-1 rounded-full border`}
                    onClick={() => setHidden(true)}
                >
                    <IoCloseOutline size={20} />
                </span>
            </div>
        </div>
    );
};

export default Alert;
