package com.example.EmployeeServiceER.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import com.example.EmployeeServiceER.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.name) LIKE %:query% OR " +
           "LOWER(e.email) LIKE %:query% OR " +
           "LOWER(e.role) LIKE %:query%")
    List<Employee> searchEmployees(@Param("query") String query);

    List<Employee> findByRoleIgnoreCase(String role);
}

