import React, { useContext } from "react";

import { AppContext } from "./util/AppContext";

function App() {
    const { user } = useContext(AppContext);
    return (
        <div className="bg-gray-100 flex justify-center items-center w-screen h-screen">
            <div className="w-4/12 bg-white shadow-md flex flex-row rounded-sm">
                <div className="bg-primary w-2"></div>
                <div className="p-4">
                    <p className="text-primary text-sm font-medium">
                        Hello {user.username}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
