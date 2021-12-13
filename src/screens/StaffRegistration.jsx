import React, { useState, useContext } from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import { Api } from "../util/Api";
import { AppContext } from "../util/AppContext";
import { useNavigate } from "react-router-dom";

const StaffRegistration = () => {
    //navigation hook
    const navigate = useNavigate();

    const { state } = useLocation();
    console.log(state.staffId);

    //alert
    const [alertLabel, setAlertLabel] = useState("");
    const [alertHidden, setAlertHidden] = useState(true);

    // Inputs
    const [password, setPassword] = useState("");
    const [confmPassword, setConfmPassword] = useState("");
    const [valdErr, setValdErr] = useState("");
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-6/12 flex flex-col items-center">
                <img src={logo} width={150} alt="Jenner" />
                <span className="font-heading text-lg text-gray-600 font-medium mb-4">
                    JENNER
                </span>
                <div className="rounded-sm shadow-lg w-8/12 p-8 bg-white">
                    <div className="font-heading text-gray-600 text-2xl mb-8">
                        Choose a password
                    </div>
                    <Alert
                        label={alertLabel}
                        theme="red-500"
                        hidden={alertHidden}
                        setHidden={setAlertHidden}
                    />

                    <div className="mb-6">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            validate={valdErr}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Password"
                            required
                            value={confmPassword}
                            onChange={(event) =>
                                setConfmPassword(event.target.value)
                            }
                            validate={valdErr}
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
                            onClick={register}
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
    );

    function register() {
        if (!validatePasswords()) return;

        const params = new FormData();
        params.append("id", state.staffId);
        params.append("password", password);
        params.append("password_confirmation", confmPassword);
        params.append("role", state.role);

        Api.post("register_staff", params)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.success) {
                    navigate("/staff/login");
                }
            })
            .catch((err) => {
                console.log(err.response.data);
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

export default StaffRegistration;
