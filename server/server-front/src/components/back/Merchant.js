import React, {useEffect, useState} from "react";
import Button from "../../lib/Button";
import {fetch_api} from "../../contexts/actions/security";

export default function Merchant() {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        fetch_api(`merchants`, 'GET', null)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setMerchants(result);
                },
            )
    }, []);

    const updateMerchantStatus = (merchant) => {
        fetch_api(`merchants/${merchant.id}`,
            'PUT',
            {
                status: merchant.status ? false : true
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