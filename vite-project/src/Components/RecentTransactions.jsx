import React from "react";
function RecentTransactions({transactions}){
    const categoryEmojis = {
        "Salary" : "💰",
        "Groceries" : "🛒",
        "Dining" : "🍽",
        "Transport" : "🚗",
        "Entertainment" : "🎭",
        "Others" : "📝"
        }
    return(
        <>
            <ul>
        {transactions.slice(-10).reverse().map((tx,index) => (
            <li key={index} className="transaction-item"> 
                <span className="transaction-category">
                   {categoryEmojis[tx.category]} {tx.category}
                </span>
                <span className={`transaction-amount ${tx.type==="Income"?"income":"expense"}`}>
                    ₹{tx.amount.toLocaleString()}
                </span>

            </li>
        ))}
        </ul>
        </>
    )
}
export default RecentTransactions;