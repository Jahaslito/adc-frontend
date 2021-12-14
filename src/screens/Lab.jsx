import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../util/AppContext";
import Input from "../components/Input";
import { Api } from "../util/Api";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../components/Button";
import { MdSave } from "react-icons/md";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const Lab = () => {
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const [labReqData, setLabReqData] = useState(null);
    const [modalHidden, setModalHidden] = useState(true);
    const colsForReq = ["Patient", "Doctor", "Description", "Date Time"];
    const colsForRes = ["Patient", "Test type", "Results"];
    const [testType, setTestType] = useState("Blood");
    const [resultName, setResultName] = useState("Haemoglobin");
    const [unit, setUnit] = useState("23");
    const [labRequests, setLabRequests] = useState([]);
    const [labResults, setLabResults] = useState([]);

    useEffect(() => {
        getRequests();
        getResults();
    }, []);

    return (
        <>
            <div className="w-full text-gray-600 flex flex-col">
                <div className="flex flex-row items-center justify-between px-3 pb-3 border-b mb-4">
                    <span className="text-lg font-light">Laboratory</span>
                    <Input
                        placeholder="Search patients"
                        styles_="text-sm"
                        noLabel
                    />
                </div>

                <div className="p-4 flex flex-col">
                    <span className="text-sm font-medium mb-4">
                        Pending Lab requests
                    </span>
                    <Table rows={labRequests} cols={colsForReq} />

                    <span className="text-sm font-medium my-4">
                        Fulfilled requests
                    </span>
                    <Table rows={labResults} cols={colsForRes} />
                </div>
            </div>

            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Serve Lab Request</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="">
                            <Input
                                label="Test type"
                                type="text"
                                placeholder="Test type"
                                value={testType}
                                onChange={(event) =>
                                    setTestType(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Result name"
                                type="text"
                                placeholder="Result name"
                                value={resultName}
                                onChange={(event) =>
                                    setResultName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Unit description"
                                type="text"
                                placeholder="Unit description"
                                value={unit}
                                onChange={(event) =>
                                    setUnit(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-row-reverse p-2 text-primary mt-20">
                            <Button
                                label="Save"
                                onClick={saveResultTypes}
                                icon={<MdSave size={20} />}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );

    function saveResults(typeId, pId) {
        const params = new FormData();
        params.append("patient_id", pId);
        params.append("test_type", testType);
        params.append("lab_result_id", typeId);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        setLoaderHidden(false);

        Api.post("lab_results", params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Lab results saved successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
                updateLabReq();
                getResults();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
                setModalHidden(true);
            });
    }

    function updateLabReq() {
        const params = new FormData();
        params.append("lab_request_id", labReqData.labReqId);

        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        Api.post("update_lab_request", params, config)
            .then((resp) => {
                console.log(resp.data);
                getRequests();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function saveResultTypes() {
        const params = new FormData();
        params.append("lab_result_name", resultName);
        params.append("patient_id", labReqData.patientId);
        params.append("unit", unit);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        setLoaderHidden(false);

        Api.post("lab_result_type", params, config)
            .then((resp) => {
                console.log(resp.data);
                saveResults(resp.data.data.id, resp.data.data.patient_id);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });
    }

    function getRequests() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        Api.get(`fetch_lab_request/0`, config)
            .then((resp) => {
                console.log(resp.data);
                const requests = [];
                resp.data.data.forEach((elem) => {
                    const req = {
                        rowClick: () => {
                            setModalHidden(false);
                            setLabReqData({
                                labReqId: elem.lab_request_id,
                                patientId: elem.patient_id,
                            });
                        },
                        data: [
                            `${elem.first_name} ${elem.last_name}`,
                            `${elem.doctor_first_name} ${elem.doctor_last_name}`,
                            elem.description,
                            format(
                                parseISO(elem.created_at),
                                "dd-MM-yyyy hh:mm:ss aaa"
                            ),
                        ],
                    };
                    requests.push(req);
                });
                setLabRequests(requests);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function getResults() {
        setLoaderHidden(false);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        Api.get(`fetch_all_lab_results`, config)
            .then((resp) => {
                console.log(resp.data);
                const results = [];
                resp.data.forEach((elem) => {
                    const result = {
                        data: [
                            `${elem.first_name} ${elem.last_name}`,
                            elem.test_type,
                            `${elem.lab_result_name} ${elem.unit}`,
                        ],
                    };
                    results.push(result);
                });
                setLabResults(results);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default Lab;
