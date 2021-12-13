import React from "react";

/**
 * label - the title of the input fiels
 * required: true - to get the asterick
 * validate: pass error message for the field
 * all other will be passed input field:
 *  - type
 *  - value: the text value typed by the user
 *  - onChange: setter function to set value as user types
 */
const Input = ({ label, required, validate, noLabel, styles_, ...props }) => {
    return (
        <div className={`flex flex-col ${styles_}`}>
            <span className="text-sm font-medium text-gray-500">
                {!noLabel && label}
                {required && <span className="text-red-500">*</span>}
            </span>
            <input
                className="bg-transparent mt-2 border-b border-gray-500 px-2 py-1 focus:outline-none focus:border-blue-500 text-gray-600"
                {...props}
            ></input>
            <span className="text-xs text-red-500 mt-1">{validate}</span>
        </div>
    );
};

export default Input;
