import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>ServerBack</h1>

            <div>
                <Link to="/admin/transactions">Transactions</Link>
                <Link to="/admin/merchants">Merchants</Link>
                <Link to="/">Home</Link>
            </div>
        </nav>
    );
}

export default Header;