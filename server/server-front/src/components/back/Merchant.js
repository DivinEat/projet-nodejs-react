import React, {useEffect, useState} from "react";
import Button from "../../lib/Button";


export default function Merchant() {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/merchants", { method: 'GET',
            headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
                })
            })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setMerchants(result);
                },
                // TODO erreurs à gérer
                // (error) => {
                //     setError(error);
                // }
            )
    }, []);

    const updateMerchantStatus = (merchant) => {
        fetch(`http://localhost:3001/merchants/${merchant.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                // Authorization: "BASIC " + localStorage.getItem("credential"),
            },
            body: JSON.stringify({
                status: merchant.status ? false : true
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("Error");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setMerchants(merchants.map(merchant => (merchant.id === data.id ? data : merchant)));
            });
    };

    const getTitle = (merchant) => {
        return merchant.status ? "Unvalidate" : "Validate";
    }

    return (
        <>
            <h1>Merchants</h1>
            
            <ul>
                {merchants.map((merchant) => (
                    <li key={merchant.id}>
                        {merchant.societyName} {merchant.status}
                        <Button title={getTitle(merchant)} onClick={() => updateMerchantStatus(merchant)}/>
                    </li>
                ))}
            </ul>
        </>
    );
}