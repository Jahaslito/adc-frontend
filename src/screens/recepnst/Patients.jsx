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
    const { setLoaderHidden, setAlerts, user } = useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);
    const cols = ["Name", "Gender", "Phone", "Email", "Address"];
    const [rows, setRows] = useState([]);

    //new patient
    const [firstName, setFirstName] = useState("Tony");
    const [lastName, setLastName] = useState("Mogoa");
    const [email, setEmail] = useState(
        `tony.mogoa${Math.floor(Math.random() * 1000)}@strathmore.edu`
    );
    const [phone, setPhone] = useState("0708502805");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("password");
    const [confmPassword, setConfmPassword] = useState("password");
    const [valdErr, setValdErr] = useState("");
    const [addresss, setAddresss] = useState("Ole Sangale");
    const [town, setTown] = useState("Siwaka");
    const [dateOfBirth, setDateOfBirth] = useState("2001-12-12");

    const [search, setSearch] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        getPatients();
    }, []);

    return (
        <>
            <div className="w-full text-gray-600 flex flex-col">
                <div className="mt-2 flex flex-col gap-3">
                    <div className="flex flex-row items-center justify-between mb-3">
                        <Input
                            placeholder="Search by phone number"
                            styles_="text-sm"
                            value={search}
                            onChange={(event) =>
                                handleSearch(event.target.value)
                            }
                            noLabel
                        />
                        {user.role === "Receptionist" && (
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
                        )}
                    </div>
                    <Table cols={cols} rows={rows} hasLinks />
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
                    <div className="grid grid-cols-2 py-4 px-6 gap-x-10 gap-y-4">
                        <div className="">
                            <Input
                                label="First Name"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Date of birth"
                                type="date"
                                placeholder="Date of Birth"
                                value={dateOfBirth}
                                onChange={(event) =>
                                    setDateOfBirth(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Phone Number"
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Street Address"
                                type="text"
                                placeholder="Street address"
                                value={addresss}
                                onChange={(event) =>
                                    setAddresss(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Town"
                                type="text"
                                placeholder="Town"
                                value={town}
                                onChange={(event) =>
                                    setTown(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <span className="text-sm font-medium text-gray-500">
                                Gender
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500 mt-2">
                                <div className="flex flex-row items-center gap-2 font-normal">
                                    <input
                                        id="genderBox"
                                        type="radio"
                                        name="gender"
                                        checked={gender === "Male"}
                                        onChange={() => setGender("Male")}
                                    />
                                    <label htmlFor="genderBox">Male</label>
                                </div>
                                <div className="flex flex-row items-center gap-2 font-normal">
                                    <input
                                        id="genderBox"
                                        type="radio"
                                        name="gender"
                                        checked={gender === "Female"}
                                        onChange={() => setGender("Female")}
                                    />
                                    <label htmlFor="genderBox">Female</label>
                                </div>
                            </div>
                        </div>
                        {/* <div className="">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                validate={valdErr}
                                required
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Password"
                                value={confmPassword}
                                onChange={(event) =>
                                    setConfmPassword(event.target.value)
                                }
                                validate={valdErr}
                                required
                            />
                        </div> */}
                    </div>
                    <div className="flex flex-row-reverse p-2">
                        <Button
                            label="Save"
                            onClick={handleRegister}
                            icon={<MdSave size={20} color={colors.primary} />}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
    function handleSearch(search) {
        setSearch(search);
        if (search === "") {
            timeoutId && clearTimeout(timeoutId);
            getPatients();
            return;
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            getSearchResults();
        }, 500);

        setTimeoutId(newTimeoutId);
    }

    function getSearchResults() {
        const params = new FormData();
        params.append("phone_number", search);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        setLoaderHidden(false);
        Api.post("search_patient", params, config)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.success) {
                    const rows_ = [];
                    resp.data.data.forEach((elem) => {
                        const row = {
                            link: `${elem.id}`,
                            data: [
                                `${elem.first_name} ${elem.last_name}`,
                                elem.gender,
                                elem.phone_number,
                                elem.email,
                                `${elem.address}, ${elem.town}`,
                            ],
                        };
                        rows_.push(row);
                    });
                    setRows(rows_);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                if (!err.response.data.success) setRows([]);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function handleRegister() {
        register();
    }

    function register() {
        const params = new FormData();
        params.append("first_name", firstName);
        params.append("last_name", lastName);
        params.append("email", email);
        params.append("phone_number", phone);
        params.append("password", password);
        params.append("password_confirmation", confmPassword);
        params.append("address", addresss);
        params.append("town", town);
        params.append("gender", gender);
        params.append("date_of_birth", dateOfBirth);

        setLoaderHidden(false);
        Api.post("register", params)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);
                if (resp.data.success) {
                    setAlerts([
                        {
                            message: "Patient registered successfully",
                            theme: "primary",
                            timeout: 15,
                            extra: (
                                <div className="p-2">
                                    <Button
                                        label="Add to queue"
                                        onClick={() =>
                                            queue(resp.data.data.user.id)
                                        }
                                    />
                                </div>
                            ),
                        },
                    ]);
                }
            })
            .catch((err) => console.log(err.response.data))
            .finally(() => {
                setLoaderHidden(true);
                setModalHidden(true);
            });
    }

    function queue(id) {
        const params = new FormData();
        params.append("patient_id", id);
        console.log(id);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        setLoaderHidden(false);

        Api.post("insert_patient_visit", params, config)
            .then((resp) => {
                console.log(resp.data);
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

    function getPatients() {
        setLoaderHidden(false);
        Api.get("patients")
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.success) {
                    const rows_ = [];
                    resp.data.data.forEach((elem) => {
                        const row = {
                            link: `${elem.id}`,
                            data: [
                                `${elem.first_name} ${elem.last_name}`,
                                elem.gender,
                                elem.phone_number,
                                elem.email,
                                `${elem.address}, ${elem.town}`,
                            ],
                        };
                        rows_.push(row);
                    });
                    setRows(rows_);
                }
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
