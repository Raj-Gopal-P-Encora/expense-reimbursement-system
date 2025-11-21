import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import '../styles/EditExpense.css';

function EditExpense() {
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
  });

  useEffect(() => {
    api.get(`/api/expenses/${expenseId}`)
      .then(res => setExpense(res.data))
      .catch(err => console.error("Error fetching expense:", err));
  }, [expenseId]);

  const handleSave = () => {
    // Basic validation
    if (!expense.description || !expense.amount || expense.amount <= 0) {
        alert("Please ensure the description is filled and the amount is valid.");
        return;
    }

    api.put(`/api/expenses/${expenseId}`, expense)
      .then(() => {
        alert("Expense updated successfully!");
        
        // Determine employeeId for redirection
        const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
        const redirectId = expense.employeeId || currentUserId;

        if (redirectId) {
            navigate(`/expenses/${redirectId}`);
        } else {
            navigate('/manager'); // Fallback for safety
        }

      })
      .catch(err => {
        console.error("Error saving expense:", err);
        alert("Cannot edit! Manager has already processed this expense.");
      });
  };

  // // Show a loading indicator until data is fetched
  // if (!expense.employeeId) return <div className="edit-expense-container"><h2 className="loading-text">Loading expense data...</h2></div>;

  return (
    <div className="edit-expense-container">
      <div className="edit-expense-form">
        <h2>Edit Expense (ID: {expenseId})</h2>

        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              className="edit-input"
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
              placeholder="Description"
              type="text"
              required
            />
        </div>

        <div className="form-group">
            <label htmlFor="amount">Amount (₹):</label>
            <input
              id="amount"
              className="edit-input"
              value={expense.amount}
              type="number"
              min="0.01"
              step="0.01"
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              placeholder="Amount"
              required
            />
        </div>

        <button onClick={handleSave} className="save-btn">Save Changes</button>
      </div>
    </div>
  );
}

export default EditExpense;