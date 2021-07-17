import logo from './logo.svg';
import './App.css';
import BackMerchant from "./components/back/Merchant";
import Merchant from "./components/front/Merchant";
import MerchantProvider from "./contexts/MerchantContext";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MerchantProvider>
                    <BrowserRouter>
                        <Route path="/admin/merchants" exact>
                            <BackMerchant />
                        </Route>

                        <Route path="/merchant" exact>
                            <Merchant />
                        </Route>
                    </BrowserRouter>
                </MerchantProvider>
            </header>
        </div>
    );
}

export default App;
