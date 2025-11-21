// import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import EmployeeList from './components/EmployeeList';
import ManagerDashboard from './components/ManagerDashboard';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EditExpense from './components/EditExpense';
import Profile from './components/Profile';
import EmployeeDirectory from './components/EmployeeDirectory';
import Unauthorized from './components/Unauthorized';



function App() {
  const [user, setUser] = useState(null); 
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route 
          path="/edit-expense/:expenseId" 
          element={
            <ProtectedRoute roles={["EMPLOYEE", "MANAGER"]}>
              <EditExpense />
            </ProtectedRoute>
          }
        />


        <Route
          path="add-expense/:employeeId" 
          element={
            <ProtectedRoute roles={["EMPLOYEE", "MANAGER"]}>
              <AddExpenseForm />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/expenses/:employeeId" 
          element={
            <ProtectedRoute roles={["EMPLOYEE", "MANAGER"]}>
              <ExpenseList />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/manager" 
          element={
            <ProtectedRoute role="MANAGER">
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
              <Profile />
          }
        />

        <Route 
          path="/employees" 
          element={
            <ProtectedRoute role="MANAGER">
              <EmployeeDirectory />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
