import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
 import "../styles/Report.css";
import NoTransactions from "../Components/NoTransactions";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Report() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((tx) => tx.date.startsWith(selectedMonth));
    setFilteredTransactions(filtered);

    let income = 0, expense = 0;
    let categoryBreakdown = {};

    filtered.forEach((tx) => {
      if (tx.type === "Income") {
        income += tx.amount;
      } else {
        expense += tx.amount;
        categoryBreakdown[tx.category] = (categoryBreakdown[tx.category] || 0) + tx.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setCategoryData(categoryBreakdown);
  }, [transactions, selectedMonth]);

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
      },
    ],
  };

  const barChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="reports-container">
      <h2>Expense Reports</h2>
      <div className="date-filter">
        <label>Select Month:</label>
        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      </div>

      <div className="summary-cards">
        <div className="income-card">
          <p>Total Income</p>
          <h3 className="income">₹{totalIncome.toLocaleString()}</h3>
        </div>
        <div className="expense-card">
          <p>Total Expense</p>
          <h3 className="expense">₹{totalExpense.toLocaleString()}</h3>
        </div>
      </div>

      <div className="charts-container">
        {/* Category-wise Expense Pie Chart */}
        <div className="chart-item">
          <h3>Category-wise Expense Breakdown</h3>
          {Object.keys(categoryData).length === 0 ? (
            <NoTransactions />
          ) : (
            <Pie data={pieChartData} />
          )}
        </div>

        {/* Income vs Expense Bar Chart */}
        <div className="chart-item">
          <h3>Income vs Expense</h3>
          {totalIncome === 0 && totalExpense === 0 ? (
            <NoTransactions />
          ) : (
            <div className="chart-wrapper">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;