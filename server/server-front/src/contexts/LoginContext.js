import React, {createContext, useState, useEffect} from 'react';
import {login as flogin} from './actions/security';

export const LoginContext = createContext();

export default function LoginProvider({children}) {
    const login = (username, password, setUserRole, setToken) => {
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

    const logout = (setUserRole, setToken) => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userRole');
        setToken(null);
        setUserRole(null);
        
    };

    return (
        <LoginContext.Provider value={{login, logout}}>
            {children}
        </LoginContext.Provider>
    );
}

