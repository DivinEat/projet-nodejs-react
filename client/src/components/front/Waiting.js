import React, {useEffect} from "react";
import {fetch_api} from "../lib/security";

function Credential() {

    useEffect(() => {
        setInterval(() => isConfirmedPayment(), 1000);
    }, [])

    const getTransactionId = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    }

    const isConfirmedPayment = () => {
        return fetch_api(`transactions/${getTransactionId()}`,
            'GET', null
        ).then((res) => res.json())
            .then((transaction) => {
                if (transaction.status === 'DONE') {
                    fetch_api(`merchants/${transaction.merchantId}`,
                        'GET',
                        null
                    ).then(res => res.json())
                        .then(
                            (merchant) => {
                                window.location.href = merchant.transactionSuccessUrl;
                            },
                        );
                }
            });
    }

    return (
        <>
            <h1>Please wait the payment confirmation</h1>

            <img src="https://www.gif-maniac.com/gifs/51/50644.gif"></img>
        </>
    );
}

export default Credential;