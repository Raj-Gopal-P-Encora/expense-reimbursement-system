package com.example.EmployeeServiceER.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EmployeeServiceER.model.Employee;
import com.example.EmployeeServiceER.repository.EmployeeRepository;
import com.example.EmployeeServiceER.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repo;
    
    @PostMapping("/create")
    public Employee create(@RequestBody Employee emp) {
        return repo.save(emp);
    }

    @GetMapping
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Employee> search(@RequestParam String query) {
        return repo.searchEmployees(query.toLowerCase());
    }

    @GetMapping("/role/{role}")
    public List<Employee> getByRole(@PathVariable String role) {
        return repo.findByRoleIgnoreCase(role);
    }
}
