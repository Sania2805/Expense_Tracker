import React, { useEffect, useState } from "react";
import "../styles/AddTransaction.css"
import Transaction from "./Transaction";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
    const [type,setType] = useState("Expense");
    const [amount,setAmount] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState("");
    const [transactions,setTransaction] = useState([]);
    const [editIndex,setEditIndex] = useState(null);


    const location = useLocation();

    function handleAddTransaction(e){
        if(!amount || !category || !date){
            return alert ("Please fill all the fields");
        }
        console.log(type, amount, category, description, date);
        
        
        const currentTransaction={
            type: type,
            amount: parseFloat(amount),
            category,
            description,
            date
        }
        let newTransactions;
        if(editIndex==null){
            newTransactions=[...transactions, currentTransaction];
        }
        else {
            newTransactions = [...transactions];
            newTransactions[editIndex]=currentTransaction;
        }

        
        
        setTransaction(newTransactions);
        localStorage.setItem("transactions", JSON.stringify(newTransactions))
        if(editIndex!==null){
            alert("Transaction Updated Syccesfully!!")
        }
        else{
            alert("Transaction Added Syccesfully!!")
        }
        setAmount("");
        setCategory("")
        setDescription("");
        setDate("");
        setType("Expense")
    }

    useEffect(() => {

        const existingTransactions=JSON.parse(localStorage.getItem("transactions")) || [];
        setTransaction(existingTransactions);
        console.log(location.state)
        if(location.state && location.state.transaction){
            const transaction=location.state.transaction;
            setType(transaction.type);
            setDate(transaction.date);
            setAmount(transaction.amount);
            setCategory(transaction.category);
            setDescription(transaction.description);
            setEditIndex(transaction.index);
            

        }
    },[location])
   
  return (
    <div className="add-transaction-container">
        <h2>Add Transaction</h2>
        <div className="transaction-box">
            <div className="transaction-type">
                <label>
                    <input type="radio" value= "Expense" checked={type=="Expense"} name= "Transaction" onChange={() => setType("Expense")}/> Expense

                    <input type="radio" value= "Income" checked={type=="Income"} name= "Transaction" onChange={() => setType("Income")}/> Income
                </label>
            </div>
            <input type="number" value={amount} placeholder="Amount (₹)" onChange={(e) => setAmount(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Select a category">Select a category</option>
                <option value="Salary">Salary</option>
                <option value="Groceries">Groceries</option>
                <option value="Dining">Dining</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
            </select>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            <button onClick={handleAddTransaction}>{editIndex==null?'Add Transaction' : 'Update Transaction'}</button>
        </div>
        
    </div>
  );
}
export default AddTransaction;