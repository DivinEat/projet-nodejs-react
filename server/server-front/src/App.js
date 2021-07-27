import './App.css';
import BackMerchant from "./components/back/Merchant";
import Merchant from "./components/front/Merchant";
import Transaction from "./components/Transaction";
import Login from "./components/front/Login";
import MerchantProvider from "./contexts/MerchantContext";
import LoginProvider from "./contexts/LoginContext";
import {BrowserRouter, Route} from "react-router-dom";
import HeaderFront from "./components/front/Header";
import HeaderBack from "./components/back/Header";
import Home from "./components/front/Home";
import PaymentForm from "./components/front/PaymentForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <LoginProvider>
                    <BrowserRouter>
                        <Route path="/admin" exact>
                            <HeaderBack/>
                        </Route>
                        <Route path="/admin/merchants" exact>
                            <HeaderBack/>
                            <BackMerchant/>
                        </Route>
                        <Route path="/admin/transactions" exact>
                            <HeaderBack/>
                            <Transaction/>
                        </Route>

                        <Route path="/" exact>
                            <HeaderFront/>
                            <Home/>
                        </Route>
                        <MerchantProvider>
                            <Route path="/register" exact>
                                <HeaderFront/>
                                <Merchant/>
                            </Route>
                        </MerchantProvider>
                        <Route path="/transactions" exact>
                            <HeaderFront/>
                            <Transaction merchant={true}/>
                        </Route>
                        <Route path="/transactions/client-confirm-payment/:id" exact>
                            <PaymentForm/>
                        </Route>
                        <Route path="/login" exact>
                            <HeaderFront/>
                            <Login/>
                        </Route>
                    </BrowserRouter>
                </LoginProvider>
            </header>
        </div>
    );
}

export default App;
