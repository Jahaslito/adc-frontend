import React from "react";

const CardButton = ({ icon, label }) => {
    return (
        <div className="w-48 border shadow-sm rounded flex flex-col items-center justify-between bg-gray-50 hover:bg-gray-100">
            <div className="flex justify-center items-center p-4 w-full bg-white">
                {icon}
            </div>
            <span className="text-sm font-medium w-full p-3 text-center border-t rounded-b">
                {label}
            </span>
        </div>
    );
};

export default CardButton;
