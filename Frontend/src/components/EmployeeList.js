import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeList.css';

function EmployeeList(){
    const [employees,setEmployees]=useState([]);

    useEffect(()=>{
        api.get("/api/employees")
            .then(response=> {
                setEmployees(response.data);
            })
            .catch(error=>{
                console.error("Error fetching employees:",error);
            });
    },[]
    );

    return(
        <div className="employee-list">
        <h2>Employee List</h2>

        {employees.length === 0 ? (
            <p>No employees found.</p>
        ) : (
            <table className="employee-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {employees.map(emp => (
                <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td className="actions-cell">
                    <Link to={`/add-expense/${emp.id}`} className="action-link add-expense-link">
                        Add Expense
                    </Link>

                    <Link to={`/expenses/${emp.id}`} className="action-link view-expenses-link">
                        View Expenses
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>

            </table>
        )}
        </div>
    )
}

export default EmployeeList;