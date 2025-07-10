import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { useEffect, useState } from "react";
function Navbar(){
    const location = useLocation();
    const [quote, setQuote] = useState(null);
    const [isModalopen, setIsModalOpen] = useState(false);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();
    const fetchQuote = async() => {
        try{
        const response = await fetch('https://quotes-api-self.vercel.app/quote')
        const data = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
        setIsModalOpen(true);

        }
        catch (error){
            console.error(error);
        }
    }

    function handleReset(){
        localStorage.clear();
        navigate("/");
    }




    return (
        <nav className="navbar">
            <h1 className="logo">Expense Tracker</h1>
            <ul className="nav-links"> 
                <li className={location.pathname=="/" ? "active":""}>
                    <Link to={'/'} >📊Dashboard</Link>
                </li>
                <li className={location.pathname=="/transaction" ? "active":""}>
                    <Link to={'/transaction'} >📄Transaction</Link>
                </li>
                <li className={location.pathname=="/reports" ? "active":""}>
                    <Link to={'/reports'} >⏳Reports</Link>
                </li>
                <li >
                    <div className="quote-btn" onClick={fetchQuote}>💡Get Quote</div>
                </li>
                <li >
                    <div className="reset-btn" onClick={handleReset}>🔄Reset</div>
                </li>
            </ul>
            {
                isModalopen &&(
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>{quote}</p>
                            <p>-{author}</p>
                            <button className="cls-btn" onClick={()=>setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}
export default Navbar;