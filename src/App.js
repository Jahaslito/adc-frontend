import React, { useContext } from "react";

import { AppContext } from "./util/AppContext";

import logo from "./logo.svg";

function App() {
    const { user } = useContext(AppContext);
    return (
        <div className="">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="font-sans border p-2 border-primary">
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link font-heading text-gray-600"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React, {user.username}
                </a>
            </header>
        </div>
    );
}

export default App;
