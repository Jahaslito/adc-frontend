import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../util/AppContext";
import Input from "../components/Input";
import Table from "../components/Table";
import { Api } from "../util/Api";

//{ cols, rows, getFunc, se }
const Patients = ({ status }) => {
    const { setLoaderHidden, user } = useContext(AppContext);
    const cols = ["Name", "Gender", "Phone", "Email", "Address"];
    const [rows, setRows] = useState([]);

    const [search, setSearch] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        getPatients();
    }, []);

    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="mt-2 flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between mb-3">
                    <Input
                        placeholder="Search by phone number"
                        styles_="text-sm"
                        value={search}
                        onChange={(event) => handleSearch(event.target.value)}
                        noLabel
                    />
                </div>
                <Table cols={cols} rows={rows} hasLinks />
            </div>
        </div>
    );
    function handleSearch(search) {
        setSearch(search);
        if (search === "") {
            timeoutId && clearTimeout(timeoutId);
            getPatients();
            return;
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            getSearchResults_(search);
        }, 500);

        setTimeoutId(newTimeoutId);
    }

    // function getSearchResults() {
    //     if (search !== "") {
    //         const filtered = rows.filter(function (row) {
    //             row.data.forEach((elem) => {
    //                 const re = new RegExp(`.*${search}.*`, "g");
    //                 return re.test(elem);
    //             });
    //         });
    //         setRows(filtered);
    //         console.log(filtered);
    //     }
    // }

    function getSearchResults_() {
        const params = new FormData();
        params.append("phone_number", search);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        setLoaderHidden(false);
        Api.post("search_patient", params, config)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.success) {
                    const rows_ = [];
                    resp.data.data.forEach((elem) => {
                        const row = {
                            link: `${elem.id}`,
                            data: [
                                `${elem.first_name} ${elem.last_name}`,
                                elem.gender,
                                elem.phone_number,
                                elem.email,
                                `${elem.address}, ${elem.town}`,
                            ],
                        };
                        rows_.push(row);
                    });
                    setRows(rows_);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                if (!err.response.data.success) setRows([]);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function getPatients() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        Api.get(`fetch_patient_with_status/${status}`, config)
            .then((resp) => {
                console.log(resp.data);
                const rows_ = [];
                resp.data.data.forEach((elem) => {
                    const row = {
                        link: `${elem.id}/${elem.patient_visit_id}`,
                        data: [
                            `${elem.first_name} ${elem.last_name}`,
                            elem.gender,
                            elem.phone_number,
                            elem.email,
                            `${elem.address}, ${elem.town}`,
                        ],
                    };
                    rows_.push(row);
                });
                setRows(rows_);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default Patients;
