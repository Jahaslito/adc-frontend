import React from "react";

const IconButton = ({ icon, style_, ...props }) => {
    return (
        <button
            className={`${style_} border border-white hover:border-gray-200 h-8 w-8 rounded-full inline-flex justify-center items-center`}
            {...props}
        >
            {icon}
        </button>
    );
};

export default IconButton;
