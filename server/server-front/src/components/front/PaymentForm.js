import React, {useState} from "react";
import Button from "../../lib/Button";
import {fetch_api} from "../../contexts/actions/security";


export default function PaymentForm() {
    const [values, setValues] = useState(
        {
            name: "",
            cardNumber: "",
            expireDate: "",
            securityCode: "",
        }
    );

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const validateTransaction = () => {
        fetch_api(`transactions/${getTranscationId()}`,
            'PUT',
            {
                status: "WAIT"
            }
        ).then(res => res.json())
            .then(
                (result) => {
                    const merchantId = result.merchantId;
                    fetch_api(`merchants/${merchantId}`,
                        'GET',
                        null
                    ).then(res => res.json())
                        .then(
                            (merchant) => {
                                fetch(`http://localhost:3001/transactions/client-confirm-payment/${getTranscationId()}`, {
                                    method: "POST",
                                    headers: {
                                        'content-type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                });

                                window.location.href = merchant.confirmUrl;
                            },
                        );
                },
            );
    };

    const cancelTransaction = () => {
        fetch_api(`transactions/${getTranscationId()}`
            ,
            'PUT',
            {
                status: "CANC"
            }
        ).then(res => res.json())
            .then(
                (result) => {
                    const merchantId = result.merchantId;
                    fetch_api(
                        `merchants/${merchantId}`
                        ,
                        'GET',
                        null
                    ).then(res => res.json())
                        .then(
                            (merchant) => {
                                window.location.href = merchant.cancelUrl;
                            },
                        );
                },
            );
    };

    const getTranscationId = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    }

    return (
        <>
            <h1>Payment</h1>

            <div>
                <input value={values.name} placeholder="Name on card" name="name"
                       onChange={handleChange}/>
                <input value={values.cardNumber} placeholder="Card number" name="cardNumber" onChange={handleChange}/>
                <input value={values.expireDate} placeholder="Expire date" name="expireDate"
                       onChange={handleChange}/>
                <input value={values.securityCode} placeholder="Security Code" name="securityCode"
                       onChange={handleChange}/>

                <div>
                    <Button title="Validate" onClick={() => validateTransaction()}/>
                    <Button title="Cancel" onClick={() => cancelTransaction()}/>
                </div>
            </div>
        </>)
        ;
}
