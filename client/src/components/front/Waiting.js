import React, {useEffect} from "react";
import {fetch_api} from "../lib/security";

function Credential() {

    useEffect(() => {
        setInterval(() => {
            return fetch_api(`transactions/get/${getTransactionId()}`,
                'GET', null
            ).then((res) => res.json())
                .then((transaction) => {
                    if (transaction.status === 'DONE') {
                        fetch_api(`merchants/${transaction.merchantId}`,
                            'GET',
                            null
                        ).then(res => res ? res.json() : null)
                            .then(
                                (merchant) => {
                                    window.location.href = merchant.transactionSuccessUrl;
                                },
                            );
                    }
                });
        }, 2000);
    }, []);

    const getTransactionId = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    }

    return (
        <>
            <h1>Please wait the payment confirmation</h1>

            <img alt="loading..." src="https://www.gif-maniac.com/gifs/51/50644.gif"></img>
        </>
    );
}

export default Credential;