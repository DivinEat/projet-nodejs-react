import React, { useState } from "react";
import Button from "../../lib/Button";

export default function MerchantForm({ onSubmit, defaultValues }) {
    const [values, setValues] = useState(
        defaultValues || {
            societyName: "",
            kbis: "",
            confirmUrl: "",
            cancelUrl: "",
            transactionSuccessUrl: "",
            currency: ""
        }
    );

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(values);
    };

    return (
        <div>
            <input value={values.societyName} name="societyName" onChange={handleChange} />
            <input value={values.kbis} name="kbis" onChange={handleChange} />
            <input value={values.confirmUrl} name="confirmUrl" onChange={handleChange} />
            <input value={values.cancelUrl} name="cancelUrl" onChange={handleChange} />
            <input value={values.transactionSuccessUrl} name="transactionSuccessUrl" onChange={handleChange} />
            <input value={values.currency} name="currency" onChange={handleChange} />

            <Button title="Submit" onClick={handleSubmit} />
        </div>
    );
}
