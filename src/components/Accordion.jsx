import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ items }) => {
    return (
        <div>
            {items && items.map((item, key) => <AccordionItem data={item} />)}
        </div>
    );
};

export default Accordion;
