import React, { useState, useContext, useEffect } from "react";
import IconButton from "./IconButton";
import TextArea from "./TextArea";
import { IoAdd } from "react-icons/io5";
import Modal from "./Modal";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { MdSave } from "react-icons/md";
import { colors } from "../assets/colors/colors";
import { AppContext } from "../util/AppContext";
import Input from "./Input";
import { Api } from "../util/Api";
import { useParams } from "react-router-dom";
import AccordionItem from "./AccordionItem";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

const DiagnosisPrescription = () => {
    const { id } = useParams();
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);
    const [diagnosis, setDiagnosis] = useState(
        "This is your second question about asynchronicity in JavaScript. I'm all for that, please keep asking well formed questions. However, is there a core question that might be better asked like. What does asynchronicity actually mean in JS?"
    );
    const [medication, setMedication] = useState("Asprin");
    const [quantity, setQuantity] = useState(3);
    const [dosage, setDosage] = useState("tablets 3 times a day");
    const [records, setRecords] = useState([]);

    useEffect(() => {
        getRecords();
    }, []);
    return (
        <>
            <div className=" p-4 flex flex-col">
                <div className="flex flex-row gap-2 items-center border-b pb-1 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Diagnosis and Prescription
                    </span>
                    <IconButton
                        icon={<IoAdd size={20} />}
                        style_="text-primary"
                        onClick={() => setModalHidden(false)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {records.map((record, key) => (
                        <div key={key}>
                            <AccordionItem label={record.label}>
                                <div className="flex flex-col gap-2 p-2 text-xs font-medium">
                                    <span className="text-sm mb-2">
                                        Diagnosis
                                    </span>
                                    <div>{record.diagnosis}</div>
                                    <span className="text-sm mb-2">
                                        Prescription
                                    </span>
                                    <div>{`${record.name} ${record.quantity} ${record.dosage}`}</div>
                                </div>
                            </AccordionItem>
                        </div>
                    ))}
                </div>
                {records.length === 0 && (
                    <span className="text-xs font-medium text-gray-400">
                        Nothing to show :(
                    </span>
                )}
            </div>

            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Add diagnosis and prescription</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col p-4">
                        <span className="text-sm font-medium my-2">
                            Diagnosis
                        </span>
                        <TextArea
                            placeholder="Type diagnosis here"
                            cols="50"
                            rows="7"
                            value={diagnosis}
                            onChange={(event) =>
                                setDiagnosis(event.target.value)
                            }
                        />

                        <span className="text-sm font-medium mt-4 mb-2">
                            Prescription
                        </span>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <Input
                                label="Name of medication"
                                type="text"
                                placeholder="Name of medication"
                                value={medication}
                                onChange={(event) =>
                                    setMedication(event.target.value)
                                }
                                required
                            />
                            <Input
                                label="Quantity"
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                required
                            />
                            <Input
                                label="Dosage"
                                type="text"
                                placeholder="Dosage"
                                value={dosage}
                                onChange={(event) =>
                                    setDosage(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mt-4 flex flex-row-reverse">
                            <Button
                                label="Save"
                                icon={
                                    <MdSave size={20} color={colors.primary} />
                                }
                                onClick={save}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );

    function getRecords() {
        setLoaderHidden(false);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        Api.post(`fetch_presc_diag/${id}`, {}, config)
            .then((resp) => {
                console.log(resp.data);
                const records_ = [];
                resp.data.data.forEach((elem) => {
                    const record = {
                        label: format(
                            parseISO(elem.updated_at),
                            "dd-MM-yyyy hh:mm:ss aaa"
                        ),
                        name: elem.name,
                        diagnosis: elem.diagnosis,
                        quantity: elem.quantity,
                        dosage: elem.dosage,
                    };
                    records_.push(record);
                });
                setRecords(records_);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function save() {
        setModalHidden(true);

        const params = new FormData();
        params.append("staff_id", user.id);
        params.append("patient_id", id);
        params.append("diagnosis", diagnosis);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        setLoaderHidden(false);

        Api.post("diagnosis", params, config)
            .then((resp) => {
                console.log(resp.data);
                savePrescription(resp.data.data.diagnosis_id);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });

        setLoaderHidden(false);
    }

    function savePrescription(diagnosisId) {
        const params = new FormData();
        params.append("name", medication);
        params.append("quantity", quantity);
        params.append("dosage", dosage);
        params.append("diagnosis_id", diagnosisId);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        Api.post("insert_prescription", params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Saved successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
                getRecords();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default DiagnosisPrescription;
