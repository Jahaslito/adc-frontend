import React, { useState, useContext } from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";
import GenderSelect from "../components/GenderSelect";
import { Api } from "../util/Api";
import PageWideSpinner from "../components/PageWideSpinner";
import { AppContext } from "../util/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { storeSession } = useContext(AppContext);
    const navigate = useNavigate();
    //spinner
    const [spinnerHidden, setSpinnerHidden] = useState(true);
    //inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confmPassword, setConfmPassword] = useState("");
    const [valdErr, setValdErr] = useState("");
    const [addresss, setAddresss] = useState("");
    const [town, setTown] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [errors, setErrors] = useState([]);

    return (
        <>
            <PageWideSpinner hidden={spinnerHidden} />

            <div className="bg-gray-100 flex justify-center items-center w-full">
                <div className="w-6/12 flex flex-col items-center">
                    <img src={logo} width={150} alt="Jenner" />
                    <span className="font-heading text-md text-gray-600 font-medium mb-4">
                        JENNER
                    </span>
                    <div className="rounded-sm shadow-lg w-8/12 p-8 bg-white">
                        <div className="font-heading text-gray-600 text-2xl mb-6">
                            Register
                        </div>

                        <div className="mb-6">
                            <Input
                                label="First Name"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                                required
                                validate={errors?.first_name?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                                required
                                validate={errors?.last_name?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Date of birth"
                                type="date"
                                placeholder="Date of Birth"
                                value={dateOfBirth}
                                onChange={(event) =>
                                    setDateOfBirth(event.target.value)
                                }
                                required
                                validate={errors?.date_of_birth?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                                validate={errors?.email?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Phone Number"
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                required
                                validate={errors?.phone_number?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Street Address"
                                type="text"
                                placeholder="Street address"
                                value={addresss}
                                onChange={(event) =>
                                    setAddresss(event.target.value)
                                }
                                required
                                validate={errors?.address?.[0]}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Town"
                                type="text"
                                placeholder="Town"
                                value={town}
                                onChange={(event) =>
                                    setTown(event.target.value)
                                }
                                required
                                validate={errors?.town?.[0]}
                            />
                        </div>
                        <div className="mb-6">
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
                        <div className="mb-6">
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
                        <div className="mb-6">
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
                        </div>
                        <div>
                            <Button
                                label="Register"
                                block
                                icon={
                                    <BsArrowRight
                                        size={20}
                                        color={colors.primary}
                                    />
                                }
                                onClick={handleRegister}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start mt-1 w-8/12">
                        <div className="flex flex-row text-gray-600 text-sm font-medium  p-2 items-center gap-1 hover:text-primary">
                            <Link to="/login">Login</Link>
                            <BsArrowRight size={16} color={colors.primary} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function handleRegister() {
        if (!validatePasswords()) return;

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

        setSpinnerHidden(false);
        Api.post("register", params)
            .then((resp) => {
                console.log(resp.data);
                const { token, user } = resp.data.data;
                setSpinnerHidden(true);
                storeSession({
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    token: token,
                    phone: user.phone_number,
                    role: "Patient",
                });
                navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                setSpinnerHidden(true);
            });
    }

    function validatePasswords() {
        if (password === "") {
            setValdErr("Password cannot be empty");
            return false;
        }
        if (password.length < 8) {
            setValdErr("Password cannot be less than 8 characters");
            return false;
        }
        if (password !== confmPassword) {
            setValdErr("Password are not matching.");
            return false;
        }
        return true;
    }
};

export default Register;
