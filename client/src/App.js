import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import Page from "./components/Page";
import {useState} from "react";
import HeaderFront from "./components/front/Header";
import HeaderBack from "./components/back/Header";
import Transaction from "./components/back/Transaction";
import Credential from "./components/back/Credential";
import Waiting from "./components/front/Waiting";

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
                        <Transaction/>
                    </Route>
                    <Route path="/admin/credential" exact>
                        <HeaderBack/>
                        <Credential/>
                    </Route>

                    <Route path="/" exact>
                        <HeaderFront/>
                    </Route>
                    <Route path="/cart" exact>
                        <HeaderFront/>
                        <Page theme={theme} setTheme={setTheme}/>
                    </Route>
                    <Route path="/confirmed-payment/:id" exact>
                        <HeaderFront/>
                        <Waiting/>
                    </Route>
                    <Route path="/canceled-payment" exact>
                        <HeaderFront/>
                        <div>Payment canceled</div>
                    </Route>
                </BrowserRouter>

            </header>
        </div>
    );
}

export default App;
