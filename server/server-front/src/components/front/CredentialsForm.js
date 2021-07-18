import React, {useState} from "react";
import Button from "../../lib/Button";

export default function CredentialsForm({login, defaultValues}) {
    const [values, setValues] = useState(
        defaultValues || {
            clientID: "",
            clientSecret: "",
        }
    );

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = () => {
        login(values);
    };

    return (
        <div>
            <input value={values.username} name="username" onChange={handleChange}/>
            <input
                value={values.password}
                type="password"
                name="password"
                onChange={handleChange}
            />
            <Button title="Login" onClick={handleLogin}/>
        </div>
    );
}
