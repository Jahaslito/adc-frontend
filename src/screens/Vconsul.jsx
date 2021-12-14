import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../util/AppContext";
import Table from "../components/Table";
import Button from "../components/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../components/Modal";
import { Api } from "../util/Api";

const Vconsul = () => {
    const { setLoaderHidden, setAlerts, user } = useContext(AppContext);
    const [approveModalHidden, setApproveModalHidden] = useState(true);
    // const [state, setstate] = useState(initialState);
    const cols = ["Patient", "Doctor", "Status", "Date Time", "Link"];
    const [rows, setRows] = useState([
        {
            data: [
                `${user.firstName} ${user.lastName}`,
                "Jackson Ray",
                "Confirmed",
                "12-12-2021 10:04 am",
                <a
                    href="https://jennervid.azurewebsites.net/?groupId=f6cbd100-5cf8-11ec-b018-61c67f122f28"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                >
                    Click here
                </a>,
            ],
        },
        {
            data: [
                `${user.firstName} ${user.lastName}`,
                "Jackson Ray",
                "Confirmed",
                "12-14-2021 09:04 am",
                <a
                    href="https://jennervid.azurewebsites.net/?groupId=02a98940-5cf9-11ec-b018-61c67f122f28"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                >
                    Click here
                </a>,
            ],
        },
    ]);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    useEffect(() => {
        switch (user.role) {
            case "Receptionist":
                getForReceptionist();
                break;
            case "Doctor":
                getForDoctor();
                break;
            default:
                getForPatient();
                break;
        }
    }, []);
    return (
        <>
            <div className="w-full text-gray-600 flex flex-col">
                <div className="flex flex-row items-center px-3 pb-3 border-b mb-3">
                    <span className="text-lg font-light">
                        Virtual Consultations
                    </span>
                </div>
                {user.role === "Patient" && (
                    <div className="flex flex-row justify-end mb-3">
                        <Button
                            label="Request Virtual Consultation"
                            icon={<AiOutlineUserAdd size={20} />}
                            onClick={reqVconsul}
                        />
                    </div>
                )}
                <Table cols={cols} rows={rows} />
            </div>

            <Modal hidden={approveModalHidden}></Modal>
        </>
    );

    function reqVconsul() {
        const params = new FormData();
        params.append("patient_id", user.id);
        console.log(user.id);

        params.append("doctor_id", "0");
        params.append("date_of_meet", "2021-12-04");
        params.append("time_of_meet", "22:12");
        params.append("video_link", "lonk");
        params.append("status", "Pending");

        setLoaderHidden(false);
        Api.post(`insert_link`, params, config)
            .then((resp) => {
                setLoaderHidden(true);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Request successful",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
                console.log(resp.data);
            })
            .catch((err) => {
                setLoaderHidden(true);

                console.log(err);
            });
    }

    function getForReceptionist() {
        Api.get(`query_all_links`, config)
            .then((resp) => {
                console.log(resp.data);
                setLoaderHidden(true);
                const requests = [];
                resp.data.data.forEach((elem) => {
                    // const req = {
                    //     rowClick: () => {
                    //         setApproveModalHidden(false);
                    //         setLabReqData({
                    //             labReqId: elem.lab_request_id,
                    //             patientId: elem.patient_id,
                    //         });
                    //     },
                    //     data: [
                    //         `${elem.first_name} ${elem.last_name}`,
                    //         `${elem.doctor_first_name} ${elem.doctor_last_name}`,
                    //         elem.description,
                    //         format(
                    //             parseISO(elem.created_at),
                    //             "dd-MM-yyyy hh:mm:ss aaa"
                    //         ),
                    //     ],
                    // };
                    //requests.push(req);
                });
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });
    }

    function getForDoctor() {
        setLoaderHidden(false);
        console.log(user.id);

        Api.get(`query_by_doctor/${user.id}`, config)
            .then((resp) => {
                console.log(resp.data);
                setLoaderHidden(true);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });
    }

    function getForPatient() {
        setLoaderHidden(false);
        console.log(user.id);

        Api.get(`query_by_doctor/0`, config)
            .then((resp) => {
                console.log(resp.data);
                setLoaderHidden(true);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });
    }
};

export default Vconsul;
