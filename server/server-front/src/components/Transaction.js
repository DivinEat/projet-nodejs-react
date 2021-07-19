import React, {useEffect, useState} from "react";
import Modal from "./lib/Modal";
import Button from "./lib/Button";

export default function Transaction({merchant}) {
    const [transactions, setTransactions] = useState([]);
    const [operations, setOperations] = useState([]);
    const [histories, setHistories] = useState([]);
    const [modalOperation, setModalOperation] = useState(false);
    const [modalHistory, setModalHistory] = useState(false);

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

        setModalOperation(true);
    }

    const clearOperations = () => {
        setModalOperation(false);
        setOperations([]);
    }

    const getHistory = (transactionId) => {
        fetch('http://localhost:3001/transaction-histories?' + new URLSearchParams({
            transactionId: transactionId,
        }))
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setHistories(result);
                },
            )

        setModalHistory(true);
    }

    const clearHistories = () => {
        setModalHistory(false);
        setHistories([]);
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
                        <Button title="Show history" onClick={() => getHistory(transaction.id)}/>
                    </li>
                ))}
            </ul>

            <Modal title="Operations" open={modalOperation} onClose={clearOperations}>
                {modalOperation && (
                    <ul>
                        {operations.map((operation) => (
                            <li key={operation.id}>
                                {operation.amount} {operation.type} {operation.createdAt}
                            </li>
                        ))}
                    </ul>
                )}
            </Modal>


            <Modal title="History" open={modalHistory} onClose={clearHistories}>
                {modalHistory && (
                    <ul>
                        {histories.map((history) => (
                            <li key={history.id}>
                                {history.initialStatus} {history.newStatus} {history.createdAt}
                            </li>
                        ))}
                    </ul>
                )}
            </Modal>
        </>
    );
}
