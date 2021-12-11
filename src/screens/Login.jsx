import React, { useState, useContext } from "react";
import { AppContext } from "../util/AppContext";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { Api } from "../util/Api";
import { useNavigate } from "react-router-dom";
import PageWideSpinner from "../components/PageWideSpinner";

const Login = () => {
    const navigate = useNavigate();
    const { storeSession } = useContext(AppContext);

    const [role, setRole] = useState("Doctor");
    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");

    const [spinnerHidden, setSpinnerHidden] = useState(true);

    //alert
    const [alertHidden, setAlertHidden] = useState(true);
    const [alertLabel, setAlertLabel] = useState("");
    return (
        <>
            <PageWideSpinner hidden={spinnerHidden} />
            <div className="w-full h-screen flex justify-center items-center bg-gray-100">
                <div className="w-6/12 flex flex-col items-center">
                    <img src={logo} width={150} alt="Jenner" />
                    <span className="font-heading text-lg text-gray-600 font-medium mb-4">
                        JENNER
                    </span>
                    <div className="rounded-sm shadow-lg w-8/12 p-8 bg-white">
                        <div className="font-heading text-gray-600 text-2xl mb-4">
                            Staff Login
                        </div>

                        <Alert
                            label={alertLabel}
                            theme="red-500"
                            hidden={alertHidden}
                            setHidden={setAlertHidden}
                        />
                        <div className="mb-6">
                            <Input
                                label="Staff ID"
                                type="text"
                                placeholder="Staff ID"
                                value={staffId}
                                onChange={(event) =>
                                    setStaffId(event.target.value)
                                }
                                required
                            />
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
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <div className="mt-3">
                                <span className="text-sm font-medium text-gray-500">
                                    Select your role
                                    <span className="text-red-500">*</span>
                                </span>
                                <div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500 mt-2">
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            id="roleBox"
                                            type="radio"
                                            name="role"
                                            checked={role === "Doctor"}
                                            onChange={() => setRole("Doctor")}
                                        />
                                        <label htmlFor="roleBox">Doctor</label>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            id="roleBox"
                                            type="radio"
                                            name="role"
                                            checked={role === "Nurse"}
                                            onChange={() => setRole("Nurse")}
                                        />
                                        <label htmlFor="roleBox">Nurse</label>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            id="roleBox"
                                            type="radio"
                                            name="role"
                                            checked={role === "Lab technician"}
                                            onChange={() =>
                                                setRole("Lab technician")
                                            }
                                        />
                                        <label htmlFor="roleBox">
                                            Lab technician
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            id="roleBox"
                                            type="radio"
                                            name="role"
                                            checked={role === "Receptionist"}
                                            onChange={() =>
                                                setRole("Receptionist")
                                            }
                                        />
                                        <label htmlFor="roleBox">
                                            Receptionist
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                label="Login"
                                block
                                icon={
                                    <BsArrowRight
                                        size={20}
                                        color={colors.primary}
                                    />
                                }
                                onClick={handleLogin}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start mt-1 w-8/12">
                        <div className="flex flex-row text-gray-600 text-sm font-medium  p-2 items-center gap-1 hover:text-primary">
                            <Link to="/staff_verification">Register</Link>
                            <BsArrowRight size={16} color={colors.primary} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function handleLogin() {
        const params = new FormData();
        params.append("id", staffId);
        params.append("password", password);
        params.append("role", role);

        setSpinnerHidden(false);

        Api.post("login_staff", params)
            .then((resp) => {
                console.log(resp.data);
                const { token, user } = resp.data.data;
                if (resp.data.success) {
                    storeSession({
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        token: token,
                        phone: user.phone_number,
                        role: role,
                    });
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                setAlertLabel("Invalid credentials");
                setAlertHidden(false);
            })
            .finally(() => {
                setSpinnerHidden(true);
            });
    }
};

export default Login;
