import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

/**
 *
 * theme can be `primary`, `red-500` etc.
 * hidden and setHidden ought to be useStates
 */
const Alert = ({ label, theme, hidden, setHidden, timeout, extra }) => {
    const [visibility, setVisibility] = useState("");
    useEffect(() => {
        if (timeout) {
            setTimeout(() => {
                setVisibility("hidden");
            }, timeout * 1000);
        }
    }, []);
    return (
        <div
            className={`flex text-xs font-medium flex-row rounded-sm border border-${theme} ${
                hidden && "hidden"
            } ${visibility}`}
        >
            <div className={`w-1 bg-${theme} rounded-l-sm`}></div>
            <div className="flex-grow">
                <div
                    className={`flex flex-row justify-between items-center p-3 rounded-r-sm text-${theme}`}
                >
                    <span>{label}</span>

                    <span
                        className={`text-${theme} p-1 rounded-full border`}
                        onClick={() => setVisibility("hidden")}
                    >
                        <IoCloseOutline size={20} />
                    </span>
                </div>
                {extra}
            </div>
        </div>
    );
};

export default Alert;
