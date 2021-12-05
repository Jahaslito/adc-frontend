import React from "react";

const TextArea = ({ ...props }) => {
    return (
        <textarea
            className="border focus:outline-none p-3 rounded-sm focus:border-blue-500"
            {...props}
        ></textarea>
    );
};

export default TextArea;
