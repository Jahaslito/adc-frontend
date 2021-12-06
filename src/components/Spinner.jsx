import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";
import { ImSpinner8 } from "react-icons/im";

import { colors } from "../assets/colors/colors";

const Spinner = () => {
    return (
        <div className="p-2 ">
            <ImSpinner8
                size={22}
                color={colors.primary}
                className="animate-spin"
            />
        </div>
    );
};

export default Spinner;
