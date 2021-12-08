import React, { useEffect, useState } from 'react';
import { colors } from "../assets/colors/colors";
import Table from "../components/Table";
import TextArea from "../components/TextArea";
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

const LabResultType = () => {

    
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
    const cols = ["Lab Result ID", "Lab Result Name", "Unit"];
    const rows = [[]];

    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-light">Lab Result Types</span>
                <Input
                    placeholder="Search results"
                    styles_="text-sm"
                    noLabel
                />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-row-reverse mb-3">
                    <Button
                        label="New Result Type"
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
                        <span>New Result Type</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200"
                            onClick={closeModal}
                        >
                            <IoCloseOutline size={20} color={colors.primary} />
                        </div>
                    </div>
                    <div className="flex p-12 flex-col">
                        <div className="flex flex-col py-2 px-4">
                            <div className="mb-6">
                                <Input
                                    label="Lab Result ID"
                                    type="text"
                                    placeholder="Result ID"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Lab Result Name"
                                    type="text"
                                    placeholder="Result Name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Unit"
                                    type="text"
                                    placeholder="Unit"
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
export default LabResultType;