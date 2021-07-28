import LoginForm from "./LoginForm";
import {LoginContext} from "../../contexts/LoginContext";
import {useContext, useEffect, useState} from "react";
import Button from "../../lib/Button";

export default function Login() {
    const {login, logout, token} = useContext(LoginContext);

    return (
        <>
            {token && (
                <Button title="Logout" onClick={() => logout()}/>
            )}
            {(token == null || token === false) && (
                <LoginForm
                    login={values => login(values.username, values.password)}
                />
            )}
            {token === false && (
                <div>Invalid credentials</div>
            )}
        </>
    );
}

