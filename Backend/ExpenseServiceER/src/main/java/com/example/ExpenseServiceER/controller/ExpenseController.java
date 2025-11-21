package com.example.ExpenseServiceER.controller;

import org.springframework.web.bind.annotation.*;

import com.example.ExpenseServiceER.model.Expense;
import com.example.ExpenseServiceER.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    public Expense create(
            @RequestBody Expense expense,
            @RequestHeader("userId") Long userId,
            @RequestHeader("role") String role) {

        // Manager should NEVER add expenses

        // SECURITY: employee can add ONLY their own expense
        if (!expense.getEmployeeId().equals(userId)) {
            throw new RuntimeException("Unauthorized: Cannot add expense for another employee");
        }

        return service.create(expense);
    }


    @GetMapping
    public List<Expense> getAll() {
        return service.getAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Expense> getByEmployee(
            @PathVariable Long employeeId,
            @RequestHeader("userId") Long userId,
            @RequestHeader("role") String role) {

        // Only managers can view all employees
        if (role.equalsIgnoreCase("MANAGER")) {
            return service.getByEmployee(employeeId);
        }

        // Employees can view ONLY their own expenses
        if (!userId.equals(employeeId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return service.getByEmployee(employeeId);
    }


    @PutMapping("/{id}/approve")
    public List<Expense> approve(@PathVariable Long id) {
        service.updateStatus(id, Expense.Status.APPROVED);
        return service.getAll();
    }

    @PutMapping("/{id}/reject")
    public List<Expense> reject(@PathVariable Long id) {
        service.updateStatus(id, Expense.Status.REJECTED);
        return service.getAll();
    }
    
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense, @RequestHeader("userId") Long userId,
    	    @RequestHeader("role") String role) {
        Expense expense = service.getById(id);
        
        if (!expense.getEmployeeId().equals(userId)) {
            throw new RuntimeException("Unauthorized update");
        }        
        
        if (expense.getStatus() != Expense.Status.PENDING) {
            throw new RuntimeException("Cannot update. Manager already processed this expense.");
        }

        expense.setAmount(updatedExpense.getAmount());
        expense.setDescription(updatedExpense.getDescription());

        return service.save(expense);
    }
    
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id,@RequestHeader("userId") Long userId,
    	    @RequestHeader("role") String role) {
        Expense expense = service.getById(id);
        
        
        if (!expense.getEmployeeId().equals(userId)) {
            throw new RuntimeException("Unauthorized delete");
        }

        if (expense.getStatus() != Expense.Status.PENDING) {
            return "CANNOT_DELETE";
        }

        service.delete(id);
        return "SUCCESS";
    }
    
    



}

