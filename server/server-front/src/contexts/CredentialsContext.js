import React, {createContext, useState, useEffect} from 'react';
import {login as flogin} from './actions/security';
import jwtDecode from 'jwt-decode';

export const CredentialsContext = createContext();

export default function CredentialsProvider({children}) {
    const [token, setToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        if (localStorage.hasOwnProperty('jwt_token')) {
            setToken(token);
        }
    }, []);

    const login = (username, password) => {
        flogin(username, password).then(token => {
            if (token) {
                localStorage.setItem('jwt_token', token);
                setToken(token);
            } else {
                setToken(false);
            }
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setToken(null);
    };

    return (
        <CredentialsContext.Provider value={{token, login, logout}}>
            {children}
        </CredentialsContext.Provider>
    );
}

