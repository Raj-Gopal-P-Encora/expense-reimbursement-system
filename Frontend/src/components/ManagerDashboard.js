import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import '../styles/ManagerDashboard.css'; // Import the CSS file

function ManagerDashboard() {
    const [expenses, setExpenses] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        api.get("/api/expenses")
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error("Error fetching expenses:", error);
            });
    }, []);

    // Helper function to update the status of a single expense item
    const updateExpenseStatus = (id, newStatus) => {
        setExpenses(prevExpenses =>
            prevExpenses.map(exp =>
                exp.id === id ? { ...exp, status: newStatus } : exp
            )
        );
    };

    const approveExpense = (id) => {
        // Optimistically update the UI status to PENDING before API call
        // updateExpenseStatus(id, "APPROVING...");

        api.put(`/api/expenses/${id}/approve`)
            .then((response) => {
                // Assuming the backend returns the updated expense object or an empty success.
                // We'll update the state with the new status "APPROVED" upon success.
                updateExpenseStatus(id, "APPROVED");
            })
            .catch((error) => {
                console.error("Error approving:", error);
                // On failure, revert the status or fetch the full list again
                // Optionally, show an error message to the user
                // updateExpenseStatus(id, "PENDING"); 
            });
    };

    const rejectExpense = (id) => {
        // Optimistically update the UI status to PENDING before API call
        // updateExpenseStatus(id, "REJECTING...");

        api.put(`/api/expenses/${id}/reject`)
            .then((response) => {
                // Assuming the backend returns the updated expense object or an empty success.
                // We'll update the state with the new status "REJECTED" upon success.
                updateExpenseStatus(id, "REJECTED");
            })
            .catch((error) => {
                console.error("Error rejecting:", error);
                // On failure, revert the status or fetch the full list again
                // updateExpenseStatus(id, "PENDING");
            });
    };

    return (
        <div className="manager-dashboard">
            <h2>Manager Dashboard</h2>
            <h3>All Submitted Expenses</h3>

            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp.id}>
                                <td>{exp.id}</td>
                                <td>{exp.employeeId}</td>
                                <td>₹{exp.amount}</td>
                                <td className="description-cell">{exp.description}</td>
                                <td className={`status-cell status-${exp.status.toLowerCase()}`}>{exp.status}</td>

                                <td>
                                    {exp.status === "PENDING" && user && exp.employeeId !== user.id && (
                                        <>
                                            <button 
                                                className="approve-btn" 
                                                onClick={() => approveExpense(exp.id)}
                                            >
                                                Approve
                                            </button>

                                            <button 
                                                className="reject-btn" 
                                                onClick={() => rejectExpense(exp.id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {(exp.status !== "PENDING" || (user && exp.employeeId === user.id)) && (
                                        <i className="no-action">No Action</i>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManagerDashboard;