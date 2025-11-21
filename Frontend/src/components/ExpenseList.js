import React,{useState,useEffect} from "react";
import { useParams,Link,useNavigate} from "react-router-dom";
import api from "../api/axiosConfig";
import '../styles/ExpenseList.css';


function ExpenseList(){
    const {employeeId} = useParams();
    const [expenses,setExpenses] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        // Confirmation before delete
        if (!window.confirm("Are you sure you want to delete this expense?")) {
            return;
        }

        api.delete(`/api/expenses/${id}`)
            .then(res => {
                if (res.data === "SUCCESS") {
                    alert("Expense deleted!");
                    // Optimistically update the UI by filtering the deleted item
                    setExpenses(expenses.filter(e => e.id !== id));
                } else {
                    alert("Cannot delete after manager has approved/rejected.");
                }
            })
            .catch(err => {
                console.error("Error deleting expense:", err);
                alert("Failed to delete expense.");
            });
    };


    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        // Ensure user is loaded before fetching
        if (!user) {
            console.error("User not logged in.");
            navigate('/login'); // Redirect if no user data
            return;
        }

        api.get(`/api/expenses/employee/${employeeId}`, {
            headers: {
                // Pass user context for authorization/filtering on the backend
                "userId": user.id,
                "role": user.role
            }
        })
        .then(res => setExpenses(res.data))
        .catch(err => {
            console.error("Error fetching expenses:", err);
        });
    },[employeeId, navigate]);

    return(
        <div className="expense-list-container">
            <h2>Expenses for Employee ID: {employeeId}</h2>
            
            <Link to={`/add-expense/${employeeId}`} className="add-expense-link-btn">
                Add New Expense
            </Link>
            
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <table className="expense-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th> {/* Added Actions header */}
                    </tr>
                </thead>

                <tbody>
                    {expenses.map(exp => (
                        <tr key={exp.id}>
                            <td>{exp.id}</td>
                            <td className="description-cell">{exp.description}</td>
                            <td>₹{exp.amount}</td>
                            <td className={`status-cell status-${exp.status.toLowerCase()}`}>{exp.status}</td>
                            <td>
                                {exp.status === "PENDING" && (
                                    <div className="action-buttons">
                                        <button 
                                            onClick={() => navigate(`/edit-expense/${exp.id}`)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>

                                        <button 
                                            onClick={() => handleDelete(exp.id)} 
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                                {exp.status !== "PENDING" && (
                                    <i className="no-action-text">Action Locked</i>
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

export default ExpenseList;