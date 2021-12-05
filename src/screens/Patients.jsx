import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { AiOutlineUserAdd } from "react-icons/ai";
import { colors } from "../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import { MdSave } from "react-icons/md";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0px",
        border: "1px solid #e2e2e2",
    },
};

Modal.setAppElement("#root");

const Patients = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }
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
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-light">Patients</span>
                <Input
                    placeholder="Search patients"
                    styles_="text-sm"
                    noLabel
                />
            </div>
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
                        onClick={openModal}
                    />
                </div>
                <Table cols={cols} rows={rows} />
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)} hidden>
                        Hello
                    </h2>
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>New patient</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200"
                            onClick={closeModal}
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
                </Modal>
            </div>
        </div>
    );
};

export default Patients;
