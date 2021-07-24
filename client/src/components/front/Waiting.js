import React, {useEffect, useState} from "react";
import {fetch_api} from "../lib/security";

function Credential() {

    useEffect(() => {
    }, [])

    const getTranscationId = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    }

    const isConfirmedPayment = () => {
        return fetch_api(`transactions/${getTranscationId()}`,
            'GET', null
        ).then((res) => res.json().status === 'DONE')
    }

    return (
        <>
            <h1>Please wait the payment confirmation</h1>

        </>
    );
}

export default Credential;