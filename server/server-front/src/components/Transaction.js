import React, {useState, useEffect, useContext} from 'react';
import SearchBar from './SearchBar';
import Modal from "./lib/Modal";
import Button from "./lib/Button";
import {fetch_api} from "../contexts/actions/security";
import {LoginContext} from "../contexts/LoginContext";

const Transaction = ({merchant}) => {
    const {userRole} = useContext(LoginContext);
    const [input, setInput] = useState('');
    const [transactionsDefault, setTransactionsDefault] = useState([]);
    const [transactions, setTransactions] = useState(() => {
        fetch_api(userRole === 'ADMIN' ? 'transactions' : 'transactions/merchant',
            'GET',
            null
        ).then(res => {
            return res != null ? res.json() : null;
        })
            .then(
                (result) => {
                    setTransactions(result)
                    setTransactionsDefault(result)
                },
            )
    });
    const [operations, setOperations] = useState([]);
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
    }

    const updateInput = async (input) => {
        const filtered = transactionsDefault.filter(transaction => {
            return transaction.consumer.toLowerCase().includes(input.toLowerCase()) || transaction.billingAddress.toLowerCase().includes(input.toLowerCase()) || transaction.shippingAddress.toLowerCase().includes(input.toLowerCase()) || transaction.cart.toLowerCase().includes(input.toLowerCase()) || transaction.totalPrice.toLowerCase().includes(input.toLowerCase()) || transaction.currency.toLowerCase().includes(input.toLowerCase()) || transaction.status.toLowerCase().includes(input.toLowerCase())
        })

        setInput(input);
        setTransactions(filtered);
    }

    return (
        <>
            <h1>Transactions</h1>

            <SearchBar
                keyword={input}
                setKeyword={updateInput}
            />

            {transactions != null && (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id}>
                            {transaction.consumer} {transaction.shippingAddress} {transaction.billingAddress}
                            {transaction.cart} {transaction.totalPrice} {transaction.currency} {transaction.status}
                            <Button title="Show operations" onClick={() => getOperations(transaction._id)}/>
                            <Button title="Show history" onClick={() => getHistory(transaction._id)}/>
                        </li>
                    ))}
                </ul>
            )}

            {transactions == null && (
                <p>Aucune transaction trouvée.</p>
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
}

export default Transaction