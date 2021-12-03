import React from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";

const Register = () => {
    return (
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
                            label="Staff ID"
                            type="text"
                            placeholder="Staff ID"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Last Name"
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
                    <div className="mb-6">
                        <Input
                            label="Password"
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

export default Register;
