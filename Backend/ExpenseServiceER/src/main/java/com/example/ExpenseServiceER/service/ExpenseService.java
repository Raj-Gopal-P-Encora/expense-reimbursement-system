package com.example.ExpenseServiceER.service;

import org.springframework.stereotype.Service;

import com.example.ExpenseServiceER.model.Expense;
import com.example.ExpenseServiceER.repository.ExpenseRepository;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public Expense create(Expense e) {
        return repo.save(e);
    }

    public List<Expense> getAll() {
        return repo.findAll();
    }

    public List<Expense> getByEmployee(Long employeeId) {
        return repo.findByEmployeeId(employeeId);
    }

    public Expense updateStatus(Long id, Expense.Status status) {
        Expense e = repo.findById(id).orElse(null);
        if (e != null) {
            e.setStatus(status);
            return repo.save(e);
        }
        return null;
    }

    public Expense getById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

	public Expense save(Expense expense) {
		return repo.save(expense);
	}

}
