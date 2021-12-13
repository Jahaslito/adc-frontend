import React, { useState, useContext } from "react";
import Table from "./Table";
import { IoAdd } from "react-icons/io5";
import Modal from "./Modal";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { MdSave } from "react-icons/md";
import IconButton from "./IconButton";
import { AppContext } from "../util/AppContext";
import TextArea from "./TextArea";
import { useParams } from "react-router-dom";
import { Api } from "../util/Api";

const Labs = ({ rows }) => {
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const { id } = useParams();
    const [modalHidden, setModalHidden] = useState(true);
    const [desc, setDesc] = useState(
        "Get the number of full years between the given dates."
    );
    const cols = ["Lab type", "Status", "Results", "Datetime"];
    return (
        <>
            <div className="flex flex-col p-2">
                <div className="flex flex-row gap-2 items-center border-b pb-1 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Lab tests
                    </span>
                    <IconButton
                        icon={<IoAdd size={20} />}
                        style_={`text-primary ${
                            user.role !== "Patient" && "hidden"
                        }`}
                        onClick={() => setModalHidden(false)}
                    />
                </div>
                <Table cols={cols} rows={rows} />
            </div>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Request Lab</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col p-4">
                        <span className="text-sm font-medium my-2">
                            Description
                        </span>
                        <TextArea
                            placeholder="Type lab request description here"
                            cols="50"
                            rows="7"
                            value={desc}
                            onChange={(event) => setDesc(event.target.value)}
                        />

                        <div className="mt-4 flex flex-row-reverse text-primary">
                            <Button
                                label="Save"
                                icon={<MdSave size={20} />}
                                onClick={() => requestLab()}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );

    function requestLab() {
        setModalHidden(true);
        const params = new FormData();
        params.append("patient_id", id);
        params.append("doctor_id", user.id);
        params.append("description", desc);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        setLoaderHidden(false);

        Api.post("request_lab", params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Lab requested successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default Labs;