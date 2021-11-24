import React from "react";
import Button from "../components/Button";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../assets/colors/colors";

const Login = () => {
    return (
        <div className="flex flex-row p-4 gap-3">
            <Button text="Login" primary />
            <Button
                text="Login"
                icon={<BsArrowRight size={20} color={colors.white} />}
            />
        </div>
    );
};

export default Login;
