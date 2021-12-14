import React, { useState } from "react";
import IconButton from "./IconButton";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
const AccordionItem = ({ label, children }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="mb-2 border rounded-sm shadow-sm">
            <div
                className={`flex flex-row rounded-sm px-4 py-1 items-center justify-between ${
                    expanded && "border-b"
                }`}
            >
                <span className="text-xs font-medium">{label}</span>
                <IconButton
                    icon={
                        expanded ? (
                            <MdOutlineArrowDropUp size={20} />
                        ) : (
                            <MdOutlineArrowDropDown size={20} />
                        )
                    }
                    style_="text-primary"
                    onClick={() => toggleExpand()}
                />
            </div>
            {expanded && <div>{children}</div>}
        </div>
    );

    function toggleExpand() {
        setExpanded(!expanded);
    }
};

export default AccordionItem;
