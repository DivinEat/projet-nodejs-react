import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Login from "./Login";
import {LoginContext} from "../../contexts/LoginContext";

function Header() {
    const {token, userRole, setUserRole} = useContext(LoginContext);

    return (
        <nav>
            <h1>ServerFront</h1>
            <div>
                <Link to="/">Home</Link>
                {(token != null) && (
                    <Link to="/transactions">Transactions</Link>
                )}
                {(userRole === 'ADMIN') && (
                    <Link to="/admin">Admin</Link>
                )}
                {(token == null) && (
                    <Link to="/register">Register</Link>
                )}
                <Login/>
            </div>

        </nav>
    );
}

export default Header;