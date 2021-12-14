import React, { useState, useContext } from "react";
import { AppContext } from "../../util/AppContext";
import Button from "../../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../../assets/colors/colors";
import Input from "../../components/Input";
import logo from "../../assets/img/jenner.svg";
import { Link } from "react-router-dom";
import { Api } from "../../util/Api";
import PageWideSpinner from "../../components/PageWideSpinner";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

const Login = () => {
    const navigate = useNavigate();
    const { storeSession } = useContext(AppContext);

    const [email, setEmail] = useState("");
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
                        <div className="font-heading text-gray-600 text-2xl mb-8">
                            Login
                        </div>

                        <div className="mb-3">
                            <Alert
                                label={alertLabel}
                                theme="red-500"
                                hidden={alertHidden}
                                setHidden={setAlertHidden}
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                label="Email address"
                                type="text"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="mb-8">
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
                            <Link to="/register">Register</Link>
                            <BsArrowRight size={16} color={colors.primary} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function handleLogin() {
        const params = new FormData();
        params.append("email", email);
        params.append("password", password);

        setSpinnerHidden(false);
        Api.post("login", params)
            .then((resp) => {
                console.log(resp.data);
                const { token, user } = resp.data.data;
                if (resp.data.success) {
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
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                setAlertLabel("Invalid credentials");
                setAlertHidden(false);
            })
            .finally(() => {
                setSpinnerHidden(true);
            });
    }
};

export default Login;
