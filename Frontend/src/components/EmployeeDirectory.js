import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import '../styles/EmployeeDirectory.css';

function EmployeeDirectory() {

  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    api.get("/api/employees")
        .then(res => setEmployees(res.data))
        .catch(err => console.error("Error loading employees:", err));
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      loadEmployees();
      return;
    }

    api.get(`/api/employees/search?query=${query}`)
       .then(res => setEmployees(res.data))
       .catch(err => console.error("Error searching employees:", err));
  };
  
  const handleClear = () => {
    setQuery("");
    loadEmployees();
  };

  return (
    <div className="directory-container">
      <h2>Employee Directory</h2>

      <div className="search-bar">
        <input 
          className="search-input"
          placeholder="Search by name, email, or role..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
        <button onClick={handleClear} className="clear-btn">Clear</button>
      </div>
      
      {employees.length === 0 && query.trim() !== "" ? (
          <p className="no-results">No employees matched your search query "{query}".</p>
      ) : employees.length === 0 ? (
          <p className="no-results">No employees found in the directory.</p>
      ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td className={`role-cell role-${e.role.toLowerCase()}`}>{e.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
}

export default EmployeeDirectory;