import React, { useEffect, useState } from 'react';
import TextArea from '../components/TextArea';
import { colors } from "../assets/colors/colors";
import Table from "../components/Table";
import Button from "../components/Button";
import { MdSave } from "react-icons/md";
import Modal from "react-modal";
import Input from '../components/Input';
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";


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

const LabResult = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }
    const cols = ["Lab Test ID", "Patient ID", "Results", "Test Type", "Resutlt Type ID"];
    const rows = [[]];

    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-light">Lab Results</span>
                <Input
                    placeholder="Search results"
                    styles_="text-sm"
                    noLabel
                />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-row-reverse mb-3">
                    <Button
                        label="New Result"
                        icon={
                            <BsFileEarmarkPlusFill
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
                        <span>New Result</span>
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
                                    label="Lab Test ID"
                                    type="text"
                                    placeholder="Test ID"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Patient ID"
                                    type="text"
                                    placeholder="Patient ID"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <TextArea
                                    placeholder="Type results here"
                                    cols="40"
                                    rows="4"
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Test Type"
                                    type="text"
                                    placeholder="Test Type"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-6/12 flex flex-col py-2 px-4">
                            <div className="mb-6">
                                <Input
                                    label="Result Type ID"
                                    type="text"
                                    placeholder="Result Type ID"
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
}
 
export default LabResult;