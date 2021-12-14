import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../util/AppContext";
import BioData from "../components/BioData";
import VitalSigns from "../components/VitalSigns";
import Labs from "../components/Labs";
import DiagnosisPrescription from "../components/DiagnosisPrescription";
import { BsPerson } from "react-icons/bs";
import Button from "../components/Button";
import { IoCalendarOutline } from "react-icons/io5";
import Modal from "../components/Modal";
import { IoCloseOutline } from "react-icons/io5";
import { Api } from "../util/Api";
import Input from "../components/Input";
import { MdSave } from "react-icons/md";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";

const Patient = () => {
    const { id } = useParams();
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState([]);

    const [pName, setPName] = useState("");

    const rows = [];

    useEffect(() => {
        getDoctors();
        console.log("called");
    }, []);
    return (
        <>
            <div className="w-full text-gray-600 flex flex-col">
                <div className="flex flex-row justify-between items-center gap-2 px-3">
                    <div className="flex flex-row items-center gap-2">
                        <BsPerson size={22} />
                        <span className="text-lg font-light">{pName}</span>
                    </div>
                    {user.role === "Receptionist" && (
                        <div className="flex flex-row gap-2 items-center">
                            <Button
                                label="Add to queue"
                                icon={<IoCalendarOutline size={20} />}
                                onClick={() => queue(id)}
                            />

                            <Button
                                label="Book appointment"
                                icon={<IoCalendarOutline size={20} />}
                                onClick={() => setModalHidden(false)}
                            />
                        </div>
                    )}
                </div>
                <div className=" flex flex-col">
                    <BioData setPName={setPName} />
                    <VitalSigns />
                    <Labs rows={rows} />
                    <DiagnosisPrescription />
                </div>
            </div>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Book appointment</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-4 py-1">
                        {Object.entries(errors).map((entry, key) => (
                            <Alert label={entry[1]} key={key} theme="red-500" />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-10 p-6">
                        <Input
                            label="Select date"
                            type="date"
                            placeholder=""
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                        />
                        <Input
                            label="Select time"
                            type="time"
                            placeholder=""
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            required
                        />

                        <div className="flex flex-col">
                            <span className="text-sm font-medium mb-2">
                                Select doctor
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="border rounded-sm py-2 px-4">
                                <select
                                    value={doctor}
                                    onChange={(event) =>
                                        setDoctor(event.target.value)
                                    }
                                    className="text-sm focus:outline-none bg-transparent"
                                >
                                    {doctors.map((doctor_, key) => (
                                        <option
                                            value={doctor_.id}
                                            key={key}
                                            className="p-4"
                                        >{`${doctor_.doctor_first_name} ${doctor_.doctor_last_name}`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-row-reverse p-4">
                        <Button
                            label="Save"
                            icon={<MdSave size={20} />}
                            onClick={saveAppoint}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );

    function queue(id_) {
        const params = new FormData();
        params.append("patient_id", id_);
        console.log(id);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        setLoaderHidden(false);

        Api.post("insert_patient_visit", params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Patient queued successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
            })
            .catch((err) => console.log(err.response.data))
            .finally(() => {
                setLoaderHidden(true);
                setModalHidden(true);
            });
    }

    function saveAppoint() {
        const params = new FormData();
        params.append("patient_id", id);
        params.append("date_of_app", date);
        params.append("time_of_app", time);
        params.append("doctor_id", doctor);
        params.append("receptionist_id", user.id);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        setLoaderHidden(false);
        Api.post("appointment", params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Appointment saved",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
                setLoaderHidden(true);
                setModalHidden(true);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
                setErrors(err.response.data.errors);
            });
    }

    function getDoctors() {
        setLoaderHidden(false);
        Api.get("doctors")
            .then((resp) => {
                console.log(resp.data);
                setDoctors(resp.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default Patient;
