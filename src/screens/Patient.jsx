import React, { useState, useContext } from "react";
import { AppContext } from "../util/AppContext";
import BioData from "../components/BioData";
import VitalSigns from "../components/VitalSigns";
import Labs from "../components/Labs";
import DiagnosisPrescription from "../components/DiagnosisPrescription";
import { BsPerson } from "react-icons/bs";

const Patient = () => {
    const { user } = useContext(AppContext);

    const [pName, setPName] = useState("");

    const rows = [];
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center gap-2 px-3">
                <BsPerson size={22} />
                <span className="text-lg font-light">{pName}</span>
            </div>
            <div className="mt-4 flex flex-col">
                <BioData setPName={setPName} />
                <VitalSigns />
                <Labs rows={rows} />
                <DiagnosisPrescription />
            </div>
        </div>
    );
};

export default Patient;
