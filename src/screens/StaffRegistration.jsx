import React, { useEffect } from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StaffRegistration = () => {
    const { state } = useLocation();
    useEffect(() => {
        console.log(state.role);
    }, []);
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

                    <div className="mb-6">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Password"
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
};

export default StaffRegistration;
