import React, {useContext} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>Website</h1>

            <div>
                <Link to="/admin/transactions">Transactions</Link>
                <Link to="/admin/merchants">Merchants</Link>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Header;