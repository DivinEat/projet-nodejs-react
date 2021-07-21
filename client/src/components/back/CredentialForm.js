import React, {useState} from "react";
import Button from "../lib/Button";

export default function CredentialForm({onSubmit}) {

    const [values, seValues] = useState({
            clientId: "",
            clientSecret: "",
        }
    );

    const handleChange = (event) => {
        seValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <>
            <div>
                <input value={values.clientId} placeholder="clientId" name="clientId"
                       onChange={handleChange}/>
                <input value={values.clientSecret} placeholder="clientSecret" name="clientSecret"
                       onChange={handleChange}/>

                <Button title="Save" onClick={() => handleSubmit(values)}/>
            </div>
        </>)
        ;
}
