import React from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

const Patients = () => {
    const cols = ["Name", "Gender", "Phone", "Email", "Address"];
    const rows = [
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
        ],
        [
            "Bob Ross",
            "Male",
            "+254708502805",
            "bobross@gmail.com",
            "Ole Sangale Road, Siwaka",
        ],
    ];
    return (
        <>
            <Link to="8">
                <Table cols={cols} rows={rows} />
            </Link>
        </>
    );
};

export default Patients;
