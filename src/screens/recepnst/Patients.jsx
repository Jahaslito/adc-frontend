import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../util/AppContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Table from "../../components/Table";
import { AiOutlineUserAdd } from "react-icons/ai";
import { colors } from "../../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../../components/Modal";
import { MdSave } from "react-icons/md";
import { Api } from "../../util/Api";

const Patients = () => {
    const { setLoaderHidden } = useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);

    useEffect(() => {
        getPatients();
    }, []);

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
    const links = ["5", "6", "7", "8"];

    return (
        <>
            <div className="w-full text-gray-600 flex flex-col">
                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex flex-row-reverse mb-3">
                        <Button
                            label="New patient"
                            icon={
                                <AiOutlineUserAdd
                                    size={20}
                                    color={colors.primary}
                                />
                            }
                            onClick={() => setModalHidden(false)}
                        />
                    </div>
                    <Table cols={cols} rows={rows} hasLinks links={links} />
                </div>
            </div>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>New patient</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} color={colors.primary} />
                        </div>
                    </div>
                    <div className="flex p-4 flex-row">
                        <div className="w-6/12 flex flex-col py-2 px-4">
                            <div className="mb-6">
                                <Input
                                    label="Firstname"
                                    type="text"
                                    placeholder="Firstname"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Lastname"
                                    type="text"
                                    placeholder="Lastname"
                                    required
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <span className="text-sm font-medium text-gray-500">
                                    {" "}
                                    Gender
                                    <span className="text-red-500">*</span>
                                </span>
                                <div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500 mt-2">
                                    <div className="flex flex-row items-center gap-2">
                                        <label htmlFor="genderBox">Male</label>
                                        <input
                                            id="genderBox"
                                            type="radio"
                                            name="gender"
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <label htmlFor="genderBox">
                                            Female
                                        </label>
                                        <input
                                            id="genderBox"
                                            type="radio"
                                            name="gender"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Email address"
                                    type="email"
                                    placeholder="Email address"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-6/12 flex flex-col py-2 px-4">
                            <div className="mb-6">
                                <Input
                                    label="Phone number"
                                    type="phone"
                                    placeholder="+254"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Street Address"
                                    type="text"
                                    placeholder="Street address"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Town"
                                    type="text"
                                    placeholder="Town"
                                    required
                                />
                            </div>
                            <div className="flex flex-row-reverse">
                                <Button
                                    label="Save"
                                    onClick={() => setModalHidden(true)}
                                    icon={
                                        <MdSave
                                            size={20}
                                            color={colors.primary}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );

    function getPatients() {
        setLoaderHidden(false);
        Api.get("patients")
            .then((resp) => {
                console.log(resp.data);
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
