import React, { useState, useContext, useEffect } from "react";
import VitalSignsTable from "./noreuse/VitalSignsTable";
import IconButton from "./IconButton";
import Modal from "./Modal";
import { IoAdd } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { MdSave } from "react-icons/md";
import { colors } from "../assets/colors/colors";
import Input from "./Input";
import AccordionItem from "./AccordionItem";
import { useParams } from "react-router-dom";
import { AppContext } from "../util/AppContext";
import { Api } from "../util/Api";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

const VitalSigns = () => {
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const { id } = useParams();
    const [modalHidden, setModalHidden] = useState(true);

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [temperature, setTemperature] = useState("");
    const [bPressure, setBPressure] = useState("");
    const [pulseRate, setPulseRate] = useState("");
    const [vitals, setVitals] = useState([]);
    useEffect(() => {
        getVitals();
    }, []);
    return (
        <>
            <div className="flex flex-col p-2">
                <div className="flex flex-row gap-2 items-center border-b pb-1 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Vital Signs
                    </span>
                    <IconButton
                        icon={<IoAdd size={20} />}
                        style_="text-primary"
                        onClick={() => setModalHidden(false)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {vitals.map((vital, key) => (
                        <div key={key}>
                            <AccordionItem label={vital.label}>
                                <VitalSignsTable vitals={vital.data} />
                            </AccordionItem>
                        </div>
                    ))}
                </div>
                {vitals.length === 0 && (
                    <span className="text-xs font-medium text-gray-400">
                        Nothing to show :(
                    </span>
                )}
            </div>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Vital Signs</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-6">
                        <div className="mb-6">
                            <Input
                                label="Height"
                                type="number"
                                placeholder="Height(meters)"
                                required
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Weight"
                                type="number"
                                placeholder="Weight{kg)"
                                required
                                value={weight}
                                onChange={(event) =>
                                    setWeight(event.target.value)
                                }
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                label="Temperature"
                                type="number"
                                placeholder="Temperature(degree celcius)"
                                required
                                value={temperature}
                                onChange={(event) =>
                                    setTemperature(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Blood Pressure"
                                type="number"
                                placeholder="Blood pressure(mm/Hg)"
                                required
                                value={bPressure}
                                onChange={(event) =>
                                    setBPressure(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Pulse rate"
                                type="number"
                                placeholder="Pulse arte(bpm)"
                                required
                                value={pulseRate}
                                onChange={(event) =>
                                    setPulseRate(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-row-reverse p-4">
                        <Button
                            label="Save"
                            icon={<MdSave size={20} color={colors.primary} />}
                            onClick={() => saveVitals()}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );

    function getVitals() {
        setLoaderHidden(false);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        Api.post(`search_vitals/${id}`, {}, config)
            .then((resp) => {
                console.log(resp.data);
                const vitals_ = [];
                resp.data.data.forEach((elem) => {
                    const vital = {
                        label: format(
                            parseISO(elem.updated_at),
                            "dd-MM-yyyy hh:mm:ss aaa"
                        ),
                        data: {
                            temperature: elem.temperature,
                            pulseRate: elem.pulse_rate,
                            weight: elem.weight,
                            height: elem.height,
                            bPressure: elem.blood_pressure,
                        },
                    };
                    vitals_.push(vital);
                });
                console.log(vitals_);
                setVitals(vitals_);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function saveVitals() {
        const params = new FormData();
        params.append("patient_id", id);
        params.append("weight", weight);
        params.append("temperature", temperature);
        params.append("blood_pressure", bPressure);
        params.append("height", height);
        params.append("pulse_rate", pulseRate);
        params.append("lab_test_id", 0);
        params.append("staff_id", user.id);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        setLoaderHidden(false);

        Api.post("vitals", params, config)
            .then((resp) => {
                console.log(resp.data);
                getVitals();
                setAlerts([]);
                setAlerts([
                    {
                        message: "Vital signs saved",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
            })
            .catch((err) => {
                console.log(err.response.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Error occurred",
                        theme: "red-500",
                        timeout: 3,
                    },
                ]);
            })
            .finally(() => {
                setLoaderHidden(true);
                setModalHidden(true);
            });
    }
};

export default VitalSigns;
