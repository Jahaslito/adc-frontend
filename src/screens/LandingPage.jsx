import React from "react";
import logo from "../assets/img/jenner.svg";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-end items-center bg-gray-100 bg-landing bg-center bg-cover">
            <div className="flex w-full flex-grow">
                <div className="p-6  w-4/12 flex justify-center items-center">
                    <div className="bg-white p-6 flex justify-center items-center shadow-lg rounded-sm">
                        <img src={logo} width={200} alt="Jenner" />
                    </div>
                </div>
                <div className="self-stretch p-20 flex flex-col gap-6 justify-center flex-grow bg-black bg-opacity-60">
                    <span className="text-8xl text-white font-bold">
                        Jenner
                    </span>
                    <span className="text-2xl text-white font-light">
                        A hospital system built for the 21st century by Africa,
                        for Africa.
                    </span>
                    <div className="flex flex-row-reverse w-10/12">
                        <Link to="/login">
                            <Button
                                label="Login"
                                icon={
                                    <BsArrowRight
                                        size={20}
                                        color={colors.white}
                                    />
                                }
                                primary
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white p-10 text-gray-600 flex flex-col">
                <span className="font-medium text-xl mb-4">Contact Us</span>
                <span className="text-sm font-medium">
                    Book an appointment through: +254 708 502805
                </span>
            </div>
        </div>
    );
};

export default LandingPage;
