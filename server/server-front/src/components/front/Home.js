import React, {useEffect, useState} from "react";
import {fetch_api} from "../../contexts/actions/security";
import Button from "../lib/Button";

function Home() {
    const [credentials, setCredentials] = useState('');

    useEffect(() => {
        fetch_api('credentials',
            'GET',
            null
        ).then(res => {
            return res != null ? res.json() : null;
        })
            .then(
                (result) => {
                    setCredentials(result)
                },
            );
    }, []);

    const generateNewCredential = () => {
        fetch_api('credentials/generate',
            'GET',
            null
        ).then((res) =>
            res.json()
        ).then((data) => {
            setCredentials({
                clientId: data.clientId,
                clientSecret: data.clientSecret
            })
        });
    }

    return (
        <>
            {credentials && (
                <>
                    <div>
                        ClientId : {credentials.clientId}
                    </div>
                    <div>
                        ClientSecret : {credentials.clientSecret}
                    </div>

                    <Button className="btn-credential" title="Generate new credential"
                            onClick={() => generateNewCredential()}/>
                </>
            )}
        </>
    );
};

export default Home;