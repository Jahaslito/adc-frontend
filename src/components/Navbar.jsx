import React from "react";
import logo from "../assets/img/jenner.svg";
import UserBar from "./UserBar";

const Navbar = () => {
    return (
        <div className="w-8/12 p-2 bg-white shadow flex flex-row items-center">
            <div className="flex flex-row items-center gap-2">
                <img src={logo} width={50} alt="Jenner" />
                <span className="font-heading text-lg text-gray-600 font-medium ml-3">
                    JENNER
                </span>
            </div>
            <div className="flex flex-row-reverse w-full">
                <UserBar />
            </div>
        </div>
    );
};

export default Navbar;
