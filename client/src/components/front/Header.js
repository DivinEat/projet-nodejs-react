import React, {useContext} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav>
            <h1>ClientFront</h1>

            <div>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </nav>
    );
}

export default Header;