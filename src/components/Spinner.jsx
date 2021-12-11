import React from "react";
import { ImSpinner8 } from "react-icons/im";

import { colors } from "../assets/colors/colors";

/**
 *
 * pass tailwind style
 */
const Spinner = ({ size, style }) => {
    return (
        <div className={`p-2 ${style}`}>
            <ImSpinner8 size={size} className="animate-spin" />
        </div>
    );
};

export default Spinner;
