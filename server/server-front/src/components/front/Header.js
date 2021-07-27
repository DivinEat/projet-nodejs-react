import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Login from "./Login";

function Header() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

    return (
        <nav>
            <h1>ServerFront</h1>

            <div>
                <Link to="/">Home</Link>
                <Link to="/transactions">Transactions</Link>
                {(userRole === 'ADMIN') && (
                    <Link to="/admin">Admin</Link>
                )}
                <Link to="/register">Register</Link>
                <Login updateUserRole={setUserRole}/>
            </div>

        </nav>
    );
}

export default Header;