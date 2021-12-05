import React from "react";
import logo from "../assets/img/jenner.svg";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="w-full h-screen flex justify-around items-center bg-gray-100 p-6">
            <div className="bg-white w-3/12 p-6 flex justify-center items-center shadow-lg rounded-sm">
                <img src={logo} width={200} alt="Jenner" />
            </div>
            <div className="w-6/12 p-6 flex flex-col gap-6 justify-center">
                <span className="text-7xl text-gray-700 font-heading">
                    Jenner
                </span>
                <span className="text-2xl text-gray-600">
                    A hospital system built for the 21st century by Africa, for
                    Africa.
                </span>
                <div className="flex flex-row-reverse w-10/12">
                    <Link to="/patient/login">
                        <Button
                            label="Login"
                            icon={
                                <BsArrowRight
                                    size={20}
                                    color={colors.primary}
                                />
                            }
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
