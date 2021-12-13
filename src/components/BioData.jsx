import React, { useState, useContext, useEffect } from "react";
import BioTable from "./noreuse/BioTable";
import { MdEdit } from "react-icons/md";
import Modal from "./Modal";
import IconButton from "./IconButton";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { MdSave } from "react-icons/md";
import { colors } from "../assets/colors/colors";
import Input from "./Input";
import { AppContext } from "../util/AppContext";
import { useParams } from "react-router-dom";
import { Api } from "../util/Api";
import differenceInYears from "date-fns/differenceInYears";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";

const BioData = ({ setPName }) => {
    const { user, setLoaderHidden, setAlerts } = useContext(AppContext);
    const { id } = useParams();
    const [bioData, setBioData] = useState({});
    const [modalHidden, setModalHidden] = useState(true);
    const [userData, setUserData] = useState({});

    //patient
    //new patient
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    // const [password, setPassword] = useState("password");
    // const [confmPassword, setConfmPassword] = useState("password");
    // const [valdErr, setValdErr] = useState("");
    const [addresss, setAddresss] = useState("");
    const [town, setTown] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    useEffect(() => {
        getBio();
    }, []);
    return (
        <>
            <div className="flex flex-col p-2">
                <div className="flex flex-row gap-2 items-center border-b pb-1 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Bio
                    </span>
                    <IconButton
                        icon={<MdEdit size={18} />}
                        style_={`text-primary ${
                            user.role !== "Patient" && "hidden"
                        }`}
                        onClick={() => setModalHidden(false)}
                    />
                </div>
                <BioTable bioData={bioData} />
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
                            onClick={save}
                            icon={<MdSave size={20} color={colors.primary} />}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );

    function save() {
        const params = new FormData();
        params.append("first_name", firstName);
        params.append("last_name", lastName);
        params.append("email", email);
        params.append("phone_number", phone);
        params.append("address", addresss);
        params.append("town", town);
        params.append("gender", gender);
        params.append("date_of_birth", dateOfBirth);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        setLoaderHidden(false);
        Api.post(`update_patient/${id}`, params, config)
            .then((resp) => {
                console.log(resp.data);
                setAlerts([]);

                setAlerts([
                    {
                        message: "Patient updated successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
                getBio();
            })
            .catch((err) => console.log(err.response.data))
            .finally(() => {
                setLoaderHidden(true);
                setModalHidden(true);
            });
    }

    function getBio() {
        const params = new FormData();
        params.append("id", id);
        setLoaderHidden(false);

        Api.post("patient", params)
            .then((resp) => {
                console.log(resp.data);
                const { data } = resp.data;
                setUserData(data[0]);
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setEmail(data[0].email);
                setDateOfBirth(
                    format(parseISO(data[0].date_of_birth), "yyyy-MM-dd")
                );
                setPhone(data[0].phone_number);
                setAddresss(data[0].address);
                setTown(data[0].town);
                setGender(data[0].gender);
                setPName(`${data[0].first_name} ${data[0].last_name}`);
                setBioData({
                    age: differenceInYears(
                        new Date(),
                        parseISO(data[0].date_of_birth)
                    ),
                    gender: data[0].gender,
                    phone: data[0].phone_number,
                    address: `${data[0].address} ${data[0].town}`,
                });
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default BioData;
