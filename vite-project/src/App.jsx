import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Dashboard from "./Pages/Dashboard";
import Transaction from "./Pages/Transaction";
import Report from "./Pages/Report";
import Navbar from "./Components/Navbar";

import NotFound from "./Pages/NotFound";
import AddTransaction from "./Pages/AddTransaction"

function App(){
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Dashboard/>}/>
          <Route path="/transaction" element = {<Transaction/>}/>
          <Route path="/reports" element = {<Report/>}/>
          <Route path="/add-transaction" element = {<AddTransaction/>}/>
          <Route path="*" element = {<NotFound/>}/>
        </Routes>
        
    </div>
    </BrowserRouter>
    
  )
}
export default App;