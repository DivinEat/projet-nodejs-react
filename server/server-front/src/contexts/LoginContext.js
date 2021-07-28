import React, {createContext, useState} from 'react';
import {fetch_api, login as flogin} from './actions/security';

export const LoginContext = createContext();

export default function LoginProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [credentials, setCredentials] = useState(localStorage.getItem('credentials') || null);

    const login = (username, password) => {
        flogin(username, password).then(data => {
            if (data == null) {
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('userRole');
                return null;
            }

            localStorage.setItem('jwt_token', data.token.value);
            localStorage.setItem('userRole', data.userRole);
            setToken(data.token.value);
            setUserRole(data.userRole);
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userRole');
        setToken(null);
        setUserRole(null);
        window.location.href = "http://localhost:3002/";
    };

    const getCredentials = () => {
        fetch_api('credentials',
            'GET',
            null
        ).then(res => {
            return res != null ? res.json() : null;
        })
            .then(
                (data) => {
                    if (data) setCredentials(data);
                },
            );
    }

    return (
        <LoginContext.Provider
            value={{
                login,
                logout,
                token,
                userRole,
                setUserRole,
                setToken,
                credentials,
                setCredentials,
                getCredentials
            }}>
            {children}
        </LoginContext.Provider>
    );
}

