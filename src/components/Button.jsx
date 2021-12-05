import React from "react";

/**
 * text - the button label
 * block: true - you get a large button
 * primary: true - a blue filled button
 * primary: false - an outline button
 * icon - pass an icon as component
 * theme - `danger` to specify red button
 */
const Button = ({ label, block, icon, theme, primary }) => {
    return (
        <button
            className={`${
                primary ? "text-white bg-" : "border-2 border-"
            }${setTheme(theme)} ${!primary && "text-"}${setTheme(theme)}
             px-7 ${
                 block ? "py-3" : "py-2"
             } flex justify-center items-center gap-3 text-sm font-medium shadow-lg ${
                primary ? "hover:bg-opacity-80" : "hover:bg-gray-100"
            }  focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50  ${
                block ? "w-full" : "rounded"
            }`}
        >
            <span className={`flex-grow flex justify-center items-center`}>
                {label}
            </span>

            <span className="flex justify-center items-center ">{icon}</span>
        </button>
    );
};

function setTheme(theme) {
    switch (theme) {
        case "danger":
            return "red-500";
        default:
            return "primary";
    }
}

export default Button;
