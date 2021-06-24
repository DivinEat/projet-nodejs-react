import React, { useEffect, useState } from "react";
import Button from "../lib/Button";
import Modal from "../lib/Modal";
import Form from "./Form";

const defaultList = [
  { name: "foo", id: 1, unitPrice: 1, quantity: 1 },
  { name: "bar", id: 2, unitPrice: 1, quantity: 1 },
];

export default function List({ theme }) {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => setList(defaultList), []);

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
    fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "BASIC " + localStorage.getItem("credential"),
      },
      body: JSON.stringify({
        currency: "EUR",
        totalPrice,
        shippingAddress: {
          address: "1 rue Bouvier",
          zipCode: "75011",
          city: "Paris",
          country: "France",
        },
        billingAddress: {
          address: "1 rue Bouvier",
          zipCode: "75011",
          city: "Paris",
          country: "France",
        },
        consumer: {
          lastname: "Foo",
          firstname: "Bart",
        },
        cart: list,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <Button title="add" theme={theme} onClick={() => setModal(true)} />
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} {item.unitPrice} {item.quantity}
            <Button title="delete" onClick={() => deleteItem(item)} />
            <Button title="edit" onClick={() => editItem(item)} />
          </li>
        ))}
      </ul>
      <p>Total price: {totalPrice}</p>
      <Modal title="Add product" open={modal} onClose={() => setModal(false)}>
        <Form onSubmit={handleSubmit} defaultValues={modal !== true && modal} />
      </Modal>
      <Button
        title="create transaction"
        onClick={() => generateTransaction()}
      />
    </div>
  );
}
