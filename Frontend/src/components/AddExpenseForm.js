import React, { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
import api from "../api/axiosConfig";
import '../styles/AddExpenseForm.css';

function AddExpenseForm(){
    const {employeeId} = useParams();
    const navigate = useNavigate();

    const[amount,setAmount] = useState("");
    const[description,setDescription] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        const expense = {
            employeeId: employeeId,
            amount: amount,
            description: description
        };

        api.post("/api/expenses", expense)
        .then(()=>{
            alert("Expense added successfully!");
            navigate(`/expenses/${employeeId}`);
        })
        .catch((error)=>{
            console.error("Error adding expense: ",error);
            alert("Error adding expense");
        });
    };

    return(
        <div className="add-expense-container">
            <h2>Add Expense</h2>
            <h3 className="employee-info">Employee ID: {employeeId}</h3>

            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount (₹):</label>
                    <input 
                        id="amount"
                        type="number" 
                        className="form-input"
                        value={amount} 
                        onChange={(e)=>setAmount(e.target.value)} 
                        required
                        min="0.01"
                        step="0.01"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input 
                        id="description"
                        type="text" 
                        className="form-input"
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)} 
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Submit Expense</button>
            </form>
        </div>
    )
}

export default AddExpenseForm;