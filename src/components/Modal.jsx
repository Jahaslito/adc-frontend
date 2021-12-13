import React from "react";

const Modal = ({ children, hidden }) => {
    return (
        <div
            className={`fixed flex justify-center items-center z-30 bg-black bg-opacity-60 w-screen h-screen top-0 left-0 ${
                hidden && "hidden"
            }`}
        >
            {children}
        </div>
    );
};

export default Modal;
