import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import Page from "./components/Page";
import {useState, useEffect} from "react";
import HeaderFront from "./components/front/Header";
import HeaderBack from "./components/back/Header";

function App() {
    const [theme, setTheme] = useState("dark");

    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Route path="/admin" exact>
                        <HeaderBack/>
                    </Route>
                    <Route path="/admin/transactions" exact>
                        <HeaderBack/>
                    </Route>

                    <Route path="/" exact>
                        <HeaderFront/>
                    </Route>
                    <Route path="/cart" exact>
                        <HeaderFront/>
                        <Page theme={theme} setTheme={setTheme}/>
                    </Route>
                </BrowserRouter>

            </header>
        </div>
    );
}

export default App;
