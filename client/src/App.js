import "./App.css";
import Page from "./components/Page";
import {useState, useEffect} from "react";

let mount = false;

function App() {
    const [theme, setTheme] = useState("dark");

    return (
        <div className="App">
            <header className="App-header">
                <Page theme={theme} setTheme={setTheme}/>
            </header>
        </div>
    );
}

export default App;
