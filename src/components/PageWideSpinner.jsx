import React from "react";
import Spinner from "./Spinner";

const PageWideSpinner = ({ hidden }) => {
    return (
        <div
            className={`fixed flex justify-center items-center z-50 bg-black bg-opacity-60 w-full h-screen ${
                hidden && "hidden"
            }`}
        >
            <Spinner size={50} style="text-white" />
        </div>
    );
};

export default PageWideSpinner;
