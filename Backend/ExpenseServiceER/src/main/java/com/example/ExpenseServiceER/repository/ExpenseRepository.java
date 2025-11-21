package com.example.ExpenseServiceER.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ExpenseServiceER.model.Expense;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByEmployeeId(Long employeeId);
}

