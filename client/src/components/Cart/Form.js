import React, {useState} from "react";
import Button from "../lib/Button";

export default function Form({onSubmit, defaultValues}) {
    const [values, setValues] = useState(
        defaultValues || {
            name: "",
            unitPrice: 0,
            quantity: 0,
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
            <input value={values.name} name="name" placeholder="Name" onChange={handleChange}/>
            <input
                value={values.unitPrice}
                type="number"
                name="unitPrice"
                placeholder="unitPrice"
                onChange={handleChange}
            />
            <input
                value={values.quantity}
                type="number"
                name="quantity"
                placeholder="quantity"
                onChange={handleChange}
            />
            <Button title="Submit" onClick={handleSubmit}/>
        </div>
    );
}
