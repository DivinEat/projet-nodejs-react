import LoginForm from "./LoginForm";
import {CredentialsContext} from "../../contexts/CredentialsContext";
import {useContext} from "react";
import Button from "../../lib/Button";

export default function Login() {
    const {token, profil, login, logout} = useContext(CredentialsContext);
    return (
        <>
            {token && (
                <>
                    <div>{JSON.stringify(profil)}</div>
                    <Button title="Logout" onClick={logout}/>
                </>
            )}
            {(token == null || token === false) && (
                <LoginForm
                    login={values => login(values.username, values.password)}
                />
            )}
            {token === false && (
                <div>Invalid credentials</div>
            )}
        </>
    );
}
