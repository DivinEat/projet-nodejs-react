import React, {useEffect, useState} from "react";
import Button from "../../lib/Button";
import Modal from "../../lib/Modal";
import Form from "./Form";
import {fetch_api} from "../../lib/security";

const defaultList = [];

export default function List({theme}) {
    const [list, setList] = useState([]);
    const [modal, setModal] = useState(false);
    const [consumerValues, setConsumerValues] = useState({
            shippingAddress: "",
            shippingZipCode: "",
            shippingCity: "",
            shippingCountry: "",

            billingAddress: "",
            billingZipCode: "",
            billingCity: "",
            billingCountry: "",

            consumerLastname: "",
            consumerFirstname: ""
        }
    );

    useEffect(() => {
        return setList(defaultList);
    }, []);

    const deleteItem = (item) => setList(list.filter((it) => it !== item));
    const editItem = (item) => setModal(item);

    const handleSubmit = (values) => {
        if (modal !== true) {
            setList(list.map((it) => (it === modal ? values : it)));
        } else setList([...list, values]);
        setModal(false);
    };

    const totalPrice = list.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
    );

    const generateTransaction = () => {
        fetch_api("transactions", "POST",
            {
                transaction: {
                    currency: "EUR",
                    totalPrice: totalPrice,
                    shippingAddress: `${consumerValues.shippingAddress} ${consumerValues.shippingCity} ${consumerValues.shippingZipCode} ${consumerValues.shippingCountry}`,
                    billingAddress: `${consumerValues.billingAddress} ${consumerValues.billingCity} ${consumerValues.billingZipCode} ${consumerValues.billingCountry}`,
                    consumer: `${consumerValues.consumerFirstname} ${consumerValues.consumerLastname}`,
                    cart: JSON.stringify(list)
                }
            }, false
        )
            .then((res) => res.json())
            .then((data) => {
                    window.location.href = data.payment_url;
                }
            )
        ;
    };

    const consumerUpdate = (event) => {
        setConsumerValues({
            ...consumerValues,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <Button title="add" theme={theme} onClick={() => setModal(true)}/>
            <ul>
                {list.map((item) => (
                    <li key={item.id}>
                        {item.name} {item.unitPrice} {item.quantity}
                        <Button title="delete" onClick={() => deleteItem(item)}/>
                        <Button title="edit" onClick={() => editItem(item)}/>
                    </li>
                ))}
            </ul>
            <p>Total price: {totalPrice}</p>
            <Modal title="Add product" open={modal} onClose={() => setModal(false)}>
                <Form onSubmit={handleSubmit} defaultValues={modal !== true && modal}/>
            </Modal>

            <div>
                <div>Shipping Address</div>
                <input value={consumerValues.shippingAddress} name="shippingAddress" placeholder="Address"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.shippingCity} name="shippingCity" placeholder="City"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.shippingCountry} name="shippingCountry" placeholder="Country"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.shippingZipCode} name="shippingZipCode" placeholder="Zip code"
                       onChange={consumerUpdate}/>

                <div>Billing Address</div>
                <input value={consumerValues.billingAddress} name="billingAddress" placeholder="Address"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.billingZipCode} name="billingZipCode" placeholder="City"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.billingCity} name="billingCity" placeholder="Country"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.billingCountry} name="billingCountry" placeholder="Zip code"
                       onChange={consumerUpdate}/>

                <div>Consumer</div>
                <input value={consumerValues.consumerLastname} name="consumerLastname" placeholder="Firstname"
                       onChange={consumerUpdate}/>
                <input value={consumerValues.consumerFirstname} name="consumerFirstname" placeholder="Lastname"
                       onChange={consumerUpdate}/>
            </div>

            <Button
                title="create transaction"
                onClick={() => generateTransaction()}
            />
        </div>
    );
}
