import LoginForm from "./LoginForm";
import {LoginContext} from "../../contexts/LoginContext";
import {useContext, useEffect, useState} from "react";
import Button from "../../lib/Button";

export default function Login({updateUserRole}) {
    const {login, logout} = useContext(LoginContext);
    const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);

    return (
        <>
            {token && (
                <Button title="Logout" onClick={() => logout(updateUserRole, setToken)}/>
            )}
            {(token == null || token === false) && (
                <LoginForm
                    login={values => login(values.username, values.password, updateUserRole, setToken)}
                />
            )}
            {token === false && (
                <div>Invalid credentials</div>
            )}
        </>
    );
}

