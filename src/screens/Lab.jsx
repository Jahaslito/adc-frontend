import React from "react";
import { Routes, Route } from "react-router-dom";
import Input from "../components/Input";
const Lab = () => {
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b mb-4">
                <span className="text-lg font-light">Laboratory</span>
                <Input
                    placeholder="Search patients"
                    styles_="text-sm"
                    noLabel
                />
            </div>
        </div>
    );
};

export default Lab;
