import React, {useContext, useEffect, useState} from "react";
import {fetch_api} from "../../contexts/actions/security";
import Button from "../lib/Button";
import {LoginContext} from "../../contexts/LoginContext";

function Home() {
    const {credentials, getCredentials} = useContext(LoginContext);

    useEffect(() => {
        getCredentials();
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

                    <Button className="btn-credential" title="Generate new credential"
                            onClick={() => getCredentials()}/>
                </>
            )}
        </>
    );
};

export default Home;