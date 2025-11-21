package com.example.AuthServiceER.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.AuthServiceER.model.*;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

