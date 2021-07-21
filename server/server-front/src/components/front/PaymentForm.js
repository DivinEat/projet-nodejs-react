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
        console.log('validate');
    };

    const cancelTransaction = () => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch_api(`transactions/${id}`,
            'PUT',
            {
                status: "CANC"
            }
        ).then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
            );
    };

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

                <Button title="Validate" onClick={() => validateTransaction}/>
                <Button title="Cancel" onClick={cancelTransaction}/>
            </div>
        </>)
        ;
}
