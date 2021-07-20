import React, {useContext} from "react";
import CredentialForm from "./CredentialForm";

function Credential() {
    const test = () => {
        console.log("test");
    }

    return (
        <>
            <h1>Credential</h1>
            <CredentialForm onSubmit={() => test}/>
        </>

    )
        ;
}

export default Credential;