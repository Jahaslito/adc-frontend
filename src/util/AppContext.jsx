import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);

    //functions
    function storeSession(user) {
        localStorage.setItem("@user", JSON.stringify(user));
        setUser(user);
    }

    function deleteSession() {
        localStorage.removeItem("@user");
        setUser(null);
    }

    const context = { user, setUser, storeSession, deleteSession };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

function getUser() {
    return JSON.parse(localStorage.getItem("@user"));
}
