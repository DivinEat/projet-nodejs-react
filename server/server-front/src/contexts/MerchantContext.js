import {createContext, useState} from "react";

const http = require("http");

export const MerchantContext = createContext();

export default function MerchantProvider({children}) {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState(null);

    const save = (societyName, kbis, confirmUrl, cancelUrl, transactionSuccessUrl, currency, username, password) => {
        const data = JSON.stringify({
            merchant: {
                societyName: societyName,
                kbis: kbis,
                confirmUrl: confirmUrl,
                cancelUrl: cancelUrl,
                transactionSuccessUrl: transactionSuccessUrl,
                currency: currency
            },
            user: {
                username: username,
                password: password
            }
        });

        const options = {
            hostname: "localhost",
            port: 3001,
            path: "/merchants",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
            },
        };

        const request = http.request(options, (res) => {
            res.setEncoding("utf8");
            if (res.statusCode === 201) {
                setRegisterSuccess(true);
            } else {
                setError("An error has occured");
            }
        });

        request.on("error", (e) => {
            console.log("test");
            setError(`problem with request: ${e.message}`);
        });

        // Write data to request body
        request.write(data);
        request.end();


        // fetch('http://localhost:3001/merchants', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         'guard': 'request-no-cors',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => {
        //         if (res.status === 201) {
        //             setRegisterSuccess(true);
        //             return;
        //         }
        //         setError("y a une erreur");
        //     })
        //     .catch(function (e) {
        //         console.error(`problem with request: ${e.message}`);
        //     });
    };

    return (
        <MerchantContext.Provider
            value={{save, registerSuccess, error}}
        >
            {children}
        </MerchantContext.Provider>
    );
}
