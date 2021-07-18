import logo from './logo.svg';
import './App.css';
import BackMerchant from "./components/back/Merchant";
import Merchant from "./components/front/Merchant";
import Login from "./components/front/Login";
import MerchantProvider from "./contexts/MerchantContext";
import CredentialsProvider from "./contexts/CredentialsContext";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <CredentialsProvider>
                    <BrowserRouter>
                        <Route path="/admin/merchants" exact>
                            <BackMerchant/>
                        </Route>

                        <MerchantProvider>
                            <Route path="/merchant" exact>
                                <Merchant/>
                            </Route>
                        </MerchantProvider>

                        <Route path="/login" exact>
                            <Login/>
                        </Route>
                    </BrowserRouter>
                </CredentialsProvider>
            </header>
        </div>
    );
}

export default App;
