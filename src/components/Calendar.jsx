import React, { useState, useEffect } from "react";
import Input from "./Input";
import { format, parse } from "date-fns";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfMonth from "date-fns/startOfMonth";

const Calendar = () => {
    const [dateInput, setDateInput] = useState("2021-12-12");
    const [date, setDate] = useState(
        parse(dateInput, "yyyy-MM-dd", new Date())
    );
    const [days, setDays] = useState([]);
    const [emptyDays, setEmptyDays] = useState([]);
    console.log(getDaysInMonth(date));
    const days_ = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    useEffect(() => {
        setRenderEmptyDays();
        setRenderDays();
    }, [dateInput]);
    return (
        <div className="w-full flex flex-col text-gray-600">
            <div className="flex flex-row justify-between items-end">
                <span className="font-medium mb-4">{format(date, "MMMM")}</span>
                <Input
                    label="Select date"
                    type="date"
                    placeholder="Date of Birth"
                    value={dateInput}
                    onChange={handleDateChange}
                    required
                />
            </div>

            <div className="mt-4 grid grid-cols-7 text-xs gap-5 p-4">
                {days_.map((day, key) => (
                    <div
                        key={key}
                        className="flex justify-center items-center font-medium"
                    >
                        {day}
                    </div>
                ))}
                {emptyDays.map((day, key) => (
                    <React.Fragment key={key}>{day}</React.Fragment>
                ))}
                {days.map((day, key) => (
                    <React.Fragment key={key}>{day}</React.Fragment>
                ))}
            </div>
        </div>
    );

    function handleDateChange(event) {
        setDateInput(event.target.value);
        setDate(parse(dateInput, "yyyy-MM-dd", new Date()));
    }

    function setRenderEmptyDays() {
        const __eDays = [];
        for (let index = 0; index < startOfMonth(date).getDay(); index++) {
            __eDays.push(<div></div>);
        }
        setEmptyDays(__eDays);
    }
    function setRenderDays() {
        const __days = [];
        for (let index = 0; index < getDaysInMonth(date); index++) {
            __days.push(
                <div className="flex justify-center pt-2 font-medium w-full h-32 border hover:bg-gray-50 rounded-sm shadow-sm">
                    <span className="font-heading">{index + 1}</span>
                </div>
            );
        }
        setDays(__days);
    }
};

export default Calendar;
