import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>ServerFront</h1>

            <div>
                <Link to="/">Home</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Header;