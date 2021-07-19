import React, {useEffect, useState} from "react";
import Modal from "./lib/Modal";
import Button from "./lib/Button";

export default function Transaction({merchant}) {
    const [transactions, setTransactions] = useState([]);
    const [operations, setOperations] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        // Soumettre le merchant si {merchant} == true

        fetch("http://localhost:3001/transactions")
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setTransactions(result);
                },
            )
    }, []);

    const getOperations = (transactionId) => {
        fetch('http://localhost:3001/operations?' + new URLSearchParams({
            transactionId: transactionId,
        }))
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setOperations(result);
                },
            )

        setModal(true);
    }

    const clearOperations = () => {
        setModal(false);
        setOperations([]);
    }

    return (
        <>
            <h1>Transactions</h1>
            
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.consumer} {transaction.shippingAddress} {transaction.billingAddress}
                        {transaction.cart} {transaction.totalPrice} {transaction.currency} {transaction.status}
                        <Button title="Show operations" onClick={() => getOperations(transaction.id)}/>
                    </li>
                ))}
            </ul>

            <Modal title="Operations" open={modal} onClose={clearOperations}>
                {modal && (
                    <ul>
                        {operations.map((operation) => (
                            <li key={operation.id}>
                                {operation.amount} {operation.type} {operation.createdAt}
                            </li>
                        ))}
                    </ul>
                )}
            </Modal>
        </>
    );
}
