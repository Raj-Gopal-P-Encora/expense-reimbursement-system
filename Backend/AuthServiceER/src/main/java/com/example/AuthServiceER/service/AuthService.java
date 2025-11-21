package com.example.AuthServiceER.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.*;

import com.example.AuthServiceER.model.User;
import com.example.AuthServiceER.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(String username, String password, boolean isManager, String secretCode) {

        if (isManager) {
            if (!"RAJ".equals(secretCode)) {
                return "INVALID_SECRET";
            }
        }

        if (userRepo.findByUsername(username) != null) {
            return "USER_EXISTS";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(isManager ? "MANAGER" : "EMPLOYEE");

        userRepo.save(user);

        return "SUCCESS";
    }

    public User login(String username, String password) {
        User user = userRepo.findByUsername(username);
        if (user == null) return null;

        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}

