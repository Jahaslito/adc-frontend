import React, { useEffect, useContext } from "react";
import { AppContext } from "../util/AppContext";
import Input from "../components/Input";
import { useParams } from "react-router-dom";
const Lab = () => {
    const { user } = useContext(AppContext);
    const { id } = useParams();
    useEffect(() => {
        getRequests();
        getResults();
    }, []);
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

            <div className="p-4"></div>
        </div>
    );

    function getRequests() {}
    function getResults() {}
};

export default Lab;
