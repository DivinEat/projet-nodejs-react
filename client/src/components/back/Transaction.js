import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Modal from "../lib/Modal";
import Button from "../lib/Button";
import {fetch_api} from "../lib/security";

const Transaction = () => {
    const [transactions, setTransactions] = useState(
        () => {
            fetch_api(`transactions/merchant-search`,
                'POST',
                null
            ).then(res => {
                console.log(res);
                return res ? res.json() : null;
            })
                .then(
                    (result) => {
                        console.log("result")
                        console.log(result)
                        setTransactions(
                            (result == null || !result.length) ? null : result
                        );
                    }
                );
        });

    const [operations, setOperations] = useState();
    const [histories, setHistories] = useState([]);
    const [modalOperation, setModalOperation] = useState(false);
    const [modalHistory, setModalHistory] = useState(false);

    const getOperations = (transactionId) => {
        fetch_api(`operations?${new URLSearchParams({transactionId: transactionId})}`,
            'GET',
            null
        ).then(res => {
            return res.json();
        })
            .then(
                (result) => {
                    setOperations(result);
                },
            );

        setModalOperation(true);
    }

    const clearOperations = () => {
        setModalOperation(false);
        setOperations([]);
    }

    const getHistory = (transactionId) => {
        fetch_api(`transaction-histories?${new URLSearchParams({transactionId: transactionId})}`,
            'GET',
            null
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setHistories(result);
                },
            );

        setModalHistory(true);
    }

    const clearHistories = () => {
        setModalHistory(false);
        setHistories([]);
    };

    const searchTransactions = (query) => {
        fetch_api("transactions/merchant-search", "POST", {query: query})
            .then(res => {
                return res != null ? res.json() : null;
            })
            .then(
                (result) => {
                    console.log("result")
                    console.log(result)
                    setTransactions(result)
                },
            );
    };

    return (
        <>
            <h1>Transactions</h1>

            <SearchBar
                submit={(query) => searchTransactions(query)}
            />
            {transactions != null && (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id}>
                            {transaction.consumer} {transaction.shippingAddress} {transaction.billingAddress}
                            {transaction.cart} {transaction.totalPrice} {transaction.currency} {transaction.status}
                            <Button title="Show operations" onClick={() => getOperations(transaction.id)}/>
                            <Button title="Show history" onClick={() => getHistory(transaction.id)}/>
                        </li>
                    ))}
                </ul>
            )}

            {transactions == null && (
                <p>Aucune transaction trouv??e.</p>
            )}

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
};

export default Transaction