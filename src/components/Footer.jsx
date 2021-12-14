import React from "react";

const Footer = () => {
    return (
        <div className="w-8/12 my-10 shadow flex flex-col items-center p-5 bg-primary text-white text-sm font-medium justify-center">
            <div className="w-full p-2 flex flex-col">
                <span className="font-medium text-sm ">Contact Us</span>
                <span className="text-xs font-medium">
                    Book an appointment through: +254 708 502805
                </span>
            </div>
            <div className="flex justify-center items-center">
                Copyright ©2021 Jenner
            </div>
        </div>
    );
};

export default Footer;
