import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { colors } from "../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import { MdSave } from "react-icons/md";
import { MdHistoryToggleOff } from "react-icons/md";

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

const Appointments = () => {
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
    const cols = [
        "Name",
        "Gender",
        "Phone",
        "Email",
        "Time",
        "Date",
        "Venue",
        "Status",
    ];
    const rows = [
        [
            "Jeff Kamau",
            "Male",
            "+254708502805",
            "jeffk@gmail.com",
            "12:00pm",
            "03/03/2021",
            "Ward 12",
            "Pending",
        ],
        [
            "Tony Mogoa",
            "Male",
            "+25470167612",
            "tonym@gmail.com",
            "9:00am",
            "02/03/2021",
            "Amani wing",
            "Done",
        ],
        [
            "Kenneth Copeland",
            "Male",
            "+2547088654",
            "KennethM@gmail.com",
            "11:30pm",
            "04/12/2021",
            "Jasiri Wing",
            "Pending",
        ],
        [
            "Beth Macbeth",
            "female",
            "+2547088654",
            "BethM@gmail.com",
            "11:30am",
            "03/11/2021",
            "Room 12",
            "Pending",
        ],
    ];

    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center justify-between px-3 pb-3 border-b">
                <span className="text-lg font-bold">Appointments</span>
                <Input
                    placeholder="Search patients"
                    styles_="text-sm"
                    noLabel
                />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-row-reverse mb-3">
                    <Button
                        label="Schedule Appointment"
                        icon={
                            <MdHistoryToggleOff
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
                        <span>New Appointment</span>
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

                            <div className="mb-6">
                                <Input
                                    label="Venue"
                                    type="text"
                                    placeholder="Venue"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-6/12 flex flex-col py-2 px-4">
                            <div className="mb-6">
                                <Input
                                    label="Date"
                                    type="date"
                                    placeholder="date"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Time"
                                    type="time"
                                    placeholder="time"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="flex flex-row-reverse">
                                <Button
                                    label="Save"
                                    onClick={closeModal}
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

export default Appointments;
