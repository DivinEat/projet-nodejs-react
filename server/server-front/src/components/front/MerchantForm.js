import React, {useState} from "react";
import Button from "../../lib/Button";

export default function MerchantForm({onSubmit, defaultValues, registerSuccess, error}) {
    const [values, setValues] = useState(
        defaultValues || {
            societyName: "",
            kbis: "",
            confirmUrl: "",
            cancelUrl: "",
            transactionSuccessUrl: "",
            currency: "",
            username: "",
            password: "",
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
        <>
            {registerSuccess === true && (
                <div>Success</div>
            )}

            {error && registerSuccess === false && (
                <div>{error}</div>
            )}

            {registerSuccess === false && (
                <div>
                    <p>Merchant</p>
                    <input value={values.societyName} placeholder="societyName" name="societyName"
                           onChange={handleChange}/>
                    <input value={values.kbis} placeholder="kbis" name="kbis" onChange={handleChange}/>
                    <input value={values.confirmUrl} placeholder="confirmUrl" name="confirmUrl"
                           onChange={handleChange}/>
                    <input value={values.cancelUrl} placeholder="cancelUrl" name="cancelUrl" onChange={handleChange}/>
                    <input value={values.transactionSuccessUrl} placeholder="transactionSuccessUrl"
                           name="transactionSuccessUrl"
                           onChange={handleChange}/>
                    <input value={values.currency} placeholder="currency" name="currency" onChange={handleChange}/>
                    <p>User</p>
                    <input value={values.username} placeholder="username" name="username" onChange={handleChange}/>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                    />

                    <Button title="Submit" onClick={handleSubmit}/>
                </div>
            )}
        </>)
        ;
}
