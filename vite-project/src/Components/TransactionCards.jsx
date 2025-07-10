import React from "react";
function TransactionCards ({balance, income,  expense}){
    return(
        <div>
            <div className="balance-card">
                <p>Current Balance</p>
                <h1>₹{balance}</h1>
            </div>
            <div className="summary-cards">
                <div className="income-card">
                    <p>Total Income</p>
                    <h3 className="income">₹{income}</h3>
                </div>
                <div className="expense-card">
                    <p>Total Expense</p>
                    <h3 className="expense">₹{expense}</h3>
                </div>
            </div>
        </div>
    )
}
export default TransactionCards;