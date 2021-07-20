import React, {useContext} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>Website</h1>

            <div>
                <Link to="/admin/transactions">Transactions</Link>
                <Link to="/">Home</Link>
            </div>
        </nav>
    );
}

export default Header;