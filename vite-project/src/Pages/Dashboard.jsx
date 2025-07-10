import React, { useEffect, useState } from "react";
import "../styles/dashboard.css" 
import TransactionCards from "../Components/TransactionCards";
import RecentTransactions from "../Components/RecentTransactions"
import NoTransactions from "../Components/NoTransactions";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { useNavigate } from "react-router-dom";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

)

function Dashboard (){
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [maxExpense, setMaxExpense]=useState(0);
    const [categoryData, setCategoryData] = useState({});

    const categories = [

        "Groceries",
        "Dining",
        "Transport",
        "Entertainment",
        "Others"
    ]
    const navigate = useNavigate();

    useEffect( () =>{
        const existingTransactions = 
            JSON.parse(localStorage.getItem("transactions")) || [];
            setTransactions(existingTransactions);
            let income=0;
            let expense=0;
            let categoryBreakDown={};
            let highestExpense=0;
            categories.forEach(cat => categoryBreakDown[cat]=0)
            existingTransactions.forEach(tx => {
                if(tx.type==="Income"){
                    income=income+tx.amount;
                }
                else{
                     expense=expense+tx.amount;
                     categoryBreakDown[tx.category]= (categoryBreakDown[tx.category] || 0) + tx.amount;
                    if (categoryBreakDown[tx.category] > highestExpense) {
                        highestExpense=categoryBreakDown[tx.category];
                    }
                }
            })
            
            setTotalExpense(expense)
            setTotalIncome(income)
            setBalance(income-expense);
            setCategoryData(categoryBreakDown);
            setMaxExpense(highestExpense);
    },[])

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: "Expenses per Category",
                data: categories.map((cat) => categoryData[cat]|| 0),
                
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#9966FF",
                    "#FFA07A"
                ]
            }
        ]
    }

    const chartOptions = {
        scales: {
            y:{
                beginAtZero: true,
                suggestedMax: maxExpense > 0? maxExpense *1.2 :10,
                grid: {
                    display: false,
                }
            },
            x:{
                grid:{
                    display: false,
                },
            },
        },
        maintainAspectRatio: false
    };
    return(
        <div className="dashboard">
            <div className="dashboard-inner">
            <h2>Dashboard </h2>
            <button className="add-transaction" onClick={() => navigate("/add-transaction")}>
                Add Transaction
            </button>
            </div>
            <TransactionCards balance={balance} income={totalIncome} expense={totalExpense}/>
            <div className="transactions-chart-row">
                <div className="transactions">
                    <h3>Recent Transactions</h3>
                    {transactions.length==0?<NoTransactions/>:
                    <RecentTransactions transactions={transactions}/>}
                </div>
                <div className="expense-chart">
                    <h3>Expense by Category</h3>
                    {chartData.datasets[0].data.every((value) => value === 0) ? (<NoTransactions />) : 
                    <div className="chart-container">
                        <Bar data={chartData} options={chartOptions}/>
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}
export default Dashboard;