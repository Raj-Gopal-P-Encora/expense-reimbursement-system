package com.example.EmployeeServiceER.service;

import org.springframework.stereotype.Service;

import com.example.EmployeeServiceER.model.Employee;
import com.example.EmployeeServiceER.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee create(Employee employee) {
        return repo.save(employee);
    }

    public Employee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

