import React, { useState } from "react";
import BioTable from "../../components/noreuse/BioTable";
import VitalSignsTable from "../../components/noreuse/VitalSignsTable";
import Table from "../../components/Table";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { MdSave } from "react-icons/md";
import { colors } from "../../assets/colors/colors";

const Patient = () => {
    const [bioData, setBioData] = useState({
        age: 48,
        gender: "Male",
        phone: "+254708502805",
        address: "Ole Sangale Road, Siwaka",
    });
    const cols = ["Lab type", "Status", "Results", "Datetime"];
    const rows = [
        ["Urine Test", "Pending", "None", "12-12-2021 11:53am"],
        ["Urine Test", "Pending", "None", "12-12-2021 11:53am"],
        ["Urine Test", "Pending", "None", "12-12-2021 11:53am"],
        ["Urine Test", "Pending", "None", "12-12-2021 11:53am"],
    ];
    return (
        <>
            {" "}
            <div className="flex flex-row mt-4">
                <div className="w-5/12 flex flex-col p-2 border-r">
                    <span className="font-medium text-gray-600 mb-4">
                        Bob Ross
                    </span>
                    <span className="text-sm font-medium text-gray-600 border-b pb-2">
                        Bio
                    </span>
                    <BioTable bioData={bioData} />
                    <span className="text-sm font-medium text-gray-600 border-b pb-2 mt-2">
                        Vital Signs
                    </span>
                    <VitalSignsTable />
                </div>
                <div className="w-7/12 p-4 flex flex-col">
                    <span className="text-sm font-medium mb-2">Diagnosis</span>
                    <TextArea
                        placeholder="Type diagnosis here"
                        cols="30"
                        rows="7"
                    />
                    <span className="text-sm font-medium my-2">Lab tests</span>
                    <Table cols={cols} rows={rows} />

                    <span className="text-sm font-medium my-2">
                        Prescription
                    </span>
                    <TextArea
                        placeholder="Type prescription here"
                        cols="30"
                        rows="7"
                    />
                    <div className="mt-4 flex flex-row-reverse">
                        <Button
                            label="Save"
                            icon={<MdSave size={20} color={colors.primary} />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Patient;
