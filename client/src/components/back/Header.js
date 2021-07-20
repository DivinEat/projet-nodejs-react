import React, {useContext} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>ClientBack</h1>

            <div>
                <Link to="/">Home</Link>
                <Link to="/admin/transactions">Transactions</Link>
                <Link to="/admin/credential">Credential</Link>
            </div>
        </nav>
    );
}

export default Header;