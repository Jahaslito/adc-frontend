import React from "react";
import logo from "../assets/img/jenner.svg";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="w-full h-screen flex justify-around items-center bg-gray-100 bg-landing bg-center bg-cover">
            <div className="p-6  w-4/12 flex justify-center items-center">
                <div className="bg-white p-6 flex justify-center items-center shadow-lg rounded-sm">
                    <img src={logo} width={200} alt="Jenner" />
                </div>
            </div>
            <div className="self-stretch p-20 flex flex-col gap-6 justify-center flex-grow bg-black bg-opacity-60">
                {/* <div className="flex flex-col gap-6 z-30 bg-white p-6 rounded bg-opacity-50">
                </div> */}
                <span className="text-8xl text-white font-bold">Jenner</span>
                <span className="text-2xl text-white font-light">
                    A hospital system built for the 21st century by Africa, for
                    Africa.
                </span>
                <div className="flex flex-row-reverse w-10/12">
                    <Link to="/patient/login">
                        <Button
                            label="Login"
                            icon={
                                <BsArrowRight size={20} color={colors.white} />
                            }
                            primary
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
