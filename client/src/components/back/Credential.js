import React, {useEffect, useState} from "react";
import CredentialForm from "./CredentialForm";

function Credential() {
    const [clientId, setClientId] = useState();
    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        if (localStorage.hasOwnProperty('credentials')) {
            setClientId(localStorage.getItem('clientId'));
            setClientSecret(localStorage.getItem('clientSecret'));
            return;
        }

        setClientId(null);
        setClientSecret(null);
    }, [])

    const save = (credentials) => {
        if (credentials != null) {
            localStorage.setItem('clientId', credentials.clientId);
            localStorage.setItem('clientSecret', credentials.clientSecret);
            localStorage.removeItem('jwt_token');
            setClientId(credentials.clientId);
            setClientSecret(credentials.clientSecret);
        }
    }

    return (
        <>
            <h1>Credentials</h1>

            {clientId && clientSecret && (
                <>
                    <div>
                        ClientId : {clientId}
                    </div>
                    <div>
                        ClientSecret : {clientSecret}
                    </div>
                </>
            )}
            <CredentialForm onSubmit={(credentials) => save(credentials)}/>
        </>
    );
}

export default Credential;