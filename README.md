Link: https://raj-gopal-p-encora.github.io/expense-reimbursement-system/

# 📘 Expense Reimbursement System — Microservices Architecture (React + Spring Boot + MySQL)

A complete microservices-based Expense Reimbursement Web Application featuring:

- **React Frontend**
- **Spring Boot Microservices**
- **Spring Cloud Gateway**
- **Eureka Service Discovery**
- **MySQL Databases**
- **Role-Based Authentication (Employee / Manager)**
- **Secure Routing & Authorization**
- **REST API using Axios**

Employees can submit expenses, and managers can approve or reject them. The system includes full backend security, proper architecture, and scalable design.

---

## 🏗️ Architecture Overview
```
 ┌─────────────────────────────┐
 │          Frontend           │
 │        (React + Axios)      │
 └───────────────┬─────────────┘
                 │ HTTP Requests
 ┌───────────────▼────────────────────────┐
 │       API Gateway (Spring Cloud)        │
 │            Port: 8083                   │
 └───────────────┬─────────────────────────┘
         Routes traffic via Eureka
 ┌───────────────┴─────────────────────────┐
 │      Eureka Server (Service Registry)    │
 │               Port: 8761                 │
 └───────┬─────────────┬─────────────┬──────┘
         │             │             │
 ┌───────▼──────┐ ┌────▼────────┐ ┌───▼────────┐
 │ Auth Service │ │ Employee Svc │ │ Expense Svc│
 │    8081      │ │    8082      │ │    8084    │
 │   MySQL      │ │   MySQL      │ │   MySQL    │
 └──────────────┘ └──────────────┘ └────────────┘
```

---

## 🎯 Features

### 👨‍💼 Authentication & Authorization
- Secure Login / Registration
- Manager registration requires secret code: **RAJ**
- Role-Based Screen Rendering
- Protected Routes (Frontend + Backend)
- Session stored in localStorage
- Automatic Axios headers for:
  - `userId`
  - `role`

### 💼 Employee Features
- Submit expense requests
- View only their own expenses
- Edit and delete only pending expenses
- Access profile
- Cannot access or modify others' data

### 🧑‍💼 Manager Features
- View all submitted expenses
- Approve / Reject expenses
- View employee directory
- Search employees
- Cannot add, edit, or delete expenses

### 🔒 Security Highlights
- Backend checks role & identity on every API call
- **Employee cannot:**
  - Access `/expenses/{otherId}`
  - Submit expense for another user
- **Manager cannot:**
  - Edit or delete expenses
- API Gateway handles CORS
- All microservices registered in Eureka

---

## 🗂️ Project Structure
```
ExpenseReimbursementProject/
│
├── Backend/
│    ├── APIGatewayER/
│    ├── AuthServiceER/
│    ├── EmployeeServiceER/
│    ├── ExpenseServiceER/
│    └── EurekaServerER/
│
└── Frontend/
     ├── public/
     ├── src/
     └── package.json
```

---

## ⚙️ Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- CSS Modules

### Backend
- Spring Boot 3.x
- Spring Cloud Gateway
- Spring Cloud Netflix Eureka
- Spring Data JPA
- Lombok
- MySQL

---

## 🚀 How to Run the Project

### 1️⃣ Start Eureka Server
```bash
cd Backend/EurekaServerER
mvn spring-boot:run
```
**Runs at:** 👉 [http://localhost:8761/](http://localhost:8761/)

---

### 2️⃣ Start Backend Microservices

#### Auth Service
```bash
cd Backend/AuthServiceER
mvn spring-boot:run
```

#### Employee Service
```bash
cd Backend/EmployeeServiceER
mvn spring-boot:run
```

#### Expense Service
```bash
cd Backend/ExpenseServiceER
mvn spring-boot:run
```

#### API Gateway
```bash
cd Backend/APIGatewayER
mvn spring-boot:run
```
**Gateway URL:** 👉 [http://localhost:8083/](http://localhost:8083/)

---

### 3️⃣ Start Frontend (React)
```bash
cd Frontend
npm install
npm start
```
**App runs at:** 👉 [http://localhost:3000/](http://localhost:3000/)

---

## 🔐 Sample Credentials

### Manager Registration:
- **Secret Code:** `RAJ`

### Example Manager Login
- **Username:** `manager1`
- **Password:** `password`

### Example Employee Login
- **Username:** `employee1`
- **Password:** `password`

---

## 📌 Important Concepts Covered

- Microservices communication using REST + Gateway
- Eureka service discovery
- Secure backend authorization
- ProtectedRoute for frontend route security
- Axios interceptor for automatic header injection
- Manager/Employee segregation
- Role-based UI + API access
- Enum-based status (PENDING / APPROVED / REJECTED)

---

## 🚀 Future Enhancements

- Docker + Docker Compose deployment
- Swagger API documentation
- Email notifications
- Admin role
- Department assignment
- File upload for expense receipts

---

## 👨‍💻 Author

**Raj Gopal Paithara**  
Full Stack Developer — Encora India
