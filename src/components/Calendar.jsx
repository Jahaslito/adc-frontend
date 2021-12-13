import React, { useState, useEffect, useContext } from "react";
import Input from "./Input";
import { format, lastDayOfMonth, parse, setDate } from "date-fns";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfMonth from "date-fns/startOfMonth";
import { AppContext } from "../util/AppContext";
import Modal from "./Modal";
import { IoCloseOutline } from "react-icons/io5";
import { Api } from "../util/Api";
import Table from "./Table";

const Calendar = () => {
    const { setLoaderHidden, user } = useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);
    const [dateInput, setDateInput] = useState("2021-12-12");
    const [clickedDate, setClickedDate] = useState(null);
    const [date, setDate_] = useState(
        parse(dateInput, "yyyy-MM-dd", new Date())
    );
    const [days, setDays] = useState([]);
    const [emptyDays, setEmptyDays] = useState([]);
    const [month, setMonth] = useState(format(date, "MMMM"));
    const [appoints, setAppoints] = useState([]);

    const days_ = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const cols = ["Patient", "Doctor", "Date", "Time"];

    useEffect(() => {
        setRenderEmptyDays();
        getAppointments();
        setDays([]);
    }, [date]);

    return (
        <>
            <div className="w-full flex flex-col text-gray-600">
                <div className="flex flex-row justify-between items-end px-4">
                    <span className="font-medium mb-4">{month}</span>
                    <Input
                        label="Select date"
                        type="date"
                        placeholder="Date of Birth"
                        value={dateInput}
                        onChange={handleDateChange}
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
                    {days.map((index, key) => {
                        const thisDate = format(
                            setDate(date, index + 1),
                            "yyyy-MM-dd"
                        );
                        const num = appoints[thisDate]?.length;

                        return (
                            <div
                                onClick={() => {
                                    setModalHidden(false);
                                    setClickedDate(thisDate);
                                }}
                                key={key}
                                className="flex flex-col justify-start items-center pt-2 font-medium w-full h-24 border hover:bg-gray-50 rounded-sm shadow-sm"
                            >
                                <span className="border text-primary font-medium rounded-full w-6 h-6 flex justify-center items-center">
                                    <span>{index + 1}</span>
                                </span>

                                <div className="flex-grow flex justify-center items-center">
                                    <span className="text-3xl font-extralight">
                                        {num}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white rounded-lg shadow-2xl">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Appointments for {clickedDate}</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>

                    <div className="p-10">
                        <Table cols={cols} rows={genRows()} />
                    </div>
                </div>
            </Modal>
        </>
    );

    function genRows() {
        if (clickedDate) {
            const rows_ = [];
            appoints[clickedDate].forEach((appoint) => {
                const row = [];
                row.push(`${appoint.first_name} ${appoint.last_name}`);
                row.push(
                    `${appoint.doctor_first_name} ${appoint.doctor_last_name}`
                );
                row.push(appoint.date_of_app);
                row.push(appoint.time_of_app);
                rows_.push({ data: row });
            });

            return rows_;
        } else {
            return [];
        }
    }

    function handleDateChange(event) {
        const parsed = parse(event.target.value, "yyyy-MM-dd", new Date());
        setDateInput(event.target.value);
        setDate_(parsed);
        setMonth(format(parsed, "MMMM"));
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
            __days.push(index);
        }
        setDays(__days);
    }

    function getAppointments() {
        const startDate = format(startOfMonth(date), "yyyy-MM-dd");
        const endDate = format(lastDayOfMonth(date), "yyyy-MM-dd");

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        setLoaderHidden(false);
        Api.post(`query_appointment/${startDate}/${endDate}`, {}, config)
            .then((resp) => {
                //console.log(resp.data);
                processResults(resp.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }

    function processResults(data) {
        const appoints_ = [];
        data.forEach((datum) => {
            const someAppoint = appoints_[datum.date_of_app];
            if (someAppoint) {
                someAppoint.push(datum);
                appoints_[datum.date_of_app] = someAppoint;
            } else {
                appoints_[datum.date_of_app] = [datum];
            }
        });
        console.log(appoints_);
        setAppoints(appoints_);
        setRenderDays();
    }
};

export default Calendar;
