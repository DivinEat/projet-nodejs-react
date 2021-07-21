import React, {useEffect, useState} from "react";
import {fetch_api} from "../../contexts/actions/security";
import Button from "../lib/Button";

function Home() {
    const [credentials, setCredentials] = useState('');

    useEffect(() => {
        // TODO merchantId
        fetch_api('credentials',
            'GET',
            null
        ).then(res => {
            return res.json();
        })
            .then(
                (result) => {
                    setCredentials(result[0])
                },
            );
    }, []);

    const generateNewCredential = () => {
        // TODO merchantId
        const token = localStorage.getItem('jwt_token');

        fetch_api(`merchants/13`,
            'PUT',
            {
                status: true
            }
        )
            .then((res) => {
                if (res.status !== 200) {
                    console.log("Error");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                fetch_api(`credentials?${new URLSearchParams({merchantId: data.id})}`,
                    'GET',
                    null
                ).then((res) =>
                    res.json()
                ).then((data) => {
                    setCredentials({
                        clientId: data[0].clientId,
                        clientSecret: data[0].clientSecret
                    })
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