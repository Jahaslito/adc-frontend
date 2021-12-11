import React, { useContext, useState } from "react";
import { AppContext } from "../util/AppContext";
import Button from "./Button";
import { AiOutlineLogout } from "react-icons/ai";
import { Api } from "../util/Api";

const UserBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user, deleteSession } = useContext(AppContext);

    document.addEventListener("click", () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        }
    });

    return (
        <>
            <div
                className="flex flex-row gap-4 items-center py-2 px-4 border border-white hover:border-gray-200 hover:bg-gray-100 rounded"
                onClick={toggleShow}
            >
                <div className="rounded-full overflow-hidden h-10 w-10 object-cover">
                    <img
                        src={"https://picsum.photos/seed/picsum/200/300"}
                        alt="Avatar"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm">
                        {`${user.firstName} ${user.lastName}`}
                    </span>
                    <span className="text-xs font-medium">
                        {user.role !== "Patient" && user.role}
                    </span>
                </div>
            </div>
            {/*dropdown*/}
            <div
                className={`absolute z-50 shadow-2xl bg-white rounded top-24 right-60 ${
                    !dropdownVisible && "hidden"
                }`}
            >
                <div className="text-gray-600 text-sm font-medium p-6">
                    {user.email}
                </div>
                <div className="border-t border-b p-4 flex justify-center items-center">
                    <Button
                        label="Log out"
                        theme="danger"
                        icon={<AiOutlineLogout size={16} />}
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </>
    );

    function toggleShow(e) {
        e.preventDefault();
        e.stopPropagation();
        setDropdownVisible(!dropdownVisible);
    }

    function handleLogout() {
        logout();
    }

    function logout() {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        Api.post("logout", {}, config)
            .then((resp) => {
                deleteSession();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }
};

export default UserBar;
