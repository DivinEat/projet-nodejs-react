import React, {useEffect, useState} from "react";
import {fetch_api} from "../../contexts/actions/security";

function Home() {
    const [credentials, setCredentials] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

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
                </>
            )}
        </>
    );
}

export default Home;