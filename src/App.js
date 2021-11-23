import React, { useContext } from "react";

import { AppContext } from "./util/AppContext";

import logo from "./logo.svg";
import "./App.css";

function App() {
    const { user } = useContext(AppContext);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="font-sans">
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link font-heading"
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
