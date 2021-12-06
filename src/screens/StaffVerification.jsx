import React from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import Input from "../components/Input";
import logo from "../assets/img/jenner.svg";
import { Link } from "react-router-dom";

const StaffVerification = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-6/12 flex flex-col items-center">
                <img src={logo} width={150} alt="Jenner" />
                <span className="font-heading text-lg text-gray-600 font-medium mb-4">
                    JENNER
                </span>
                <div className="rounded-sm shadow-lg w-8/12 p-8 bg-white">
                    <div className="font-heading text-gray-600 text-2xl mb-8">
                        Verification
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
                    <label for="role" className="text-sm font-medium text-gray-500">Role</label>
                        <div className="mt-3">
                        <span className="text-sm font-medium text-gray-500">
                            {" "}
                            Role
                            <span className="text-red-500">*</span>
                        </span>
                        <div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500 mt-2">
                            <div className="flex flex-row items-center gap-2">
                                <label htmlFor="roleBox">Doctor</label>
                                <input
                                    id="roleBox"
                                    type="radio"
                                    name="role"
                                />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label htmlFor="roleBox">
                                    Nurse
                                </label>
                                <input
                                    id="roleBox"
                                    type="radio"
                                    name="role"
                                />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label htmlFor="roleBox">
                                    Lab Technician
                                </label>
                                <input
                                    id="roleBox"
                                    type="radio"
                                    name="role"
                                />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label htmlFor="roleBox">
                                    Receptionist
                                </label>
                                <input
                                    id="roleBox"
                                    type="radio"
                                    name="role"
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            label="Verify"
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

export default StaffVerification;
