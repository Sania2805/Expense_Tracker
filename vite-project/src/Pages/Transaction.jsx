import React, { useEffect, useState } from "react";
import "../styles/transaction.css";
import { useNavigate } from "react-router-dom";
import NoTransactions from "../Components/NoTransactions";

function Transaction() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(existingTransactions);
    }, []);

    const categoryEmojis = {
        Salary: "💰",
        Groceries: "🛒",
        Dining: "🍽",
        Transport: "🚗",
        Entertainment: "🎭",
        Others: "📝"
    };

    function handleEdit(index) {
        const editTransaction = transactions[index];
        navigate("/add-transaction", {
            state: { transaction: { ...editTransaction, index } },
        });
    }

    function handleDelete(index) {
        const updatedTransactions = transactions.filter((data, i) => i !== index);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        setTransactions(updatedTransactions); 
    }

    return (
        <div className="transactions-container">
            <h2>All Transactions</h2>
            {transactions.length==0? <NoTransactions/>:
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, index) => (
                        <tr key={index}>
                            <td>{categoryEmojis[tx.category]} {tx.category}</td>
                            <td>{tx.description || "No Description"}</td>
                            <td className={tx.type === "Income" ? "income" : "expense"}>
                                {tx.amount.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR"
                                })}
                            </td>
                            <td>{tx.date}</td>
                            <td>{tx.type}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(index)}>✏️ Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(index)}>⌫ Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
}
        </div>
    );
}

export default Transaction;
