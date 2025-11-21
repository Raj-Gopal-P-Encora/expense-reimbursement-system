package com.example.AuthServiceER.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.example.AuthServiceER.model.User;
import com.example.AuthServiceER.repository.UserRepository;
import com.example.AuthServiceER.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserRepository userRepository;
    

//    @PostMapping("/register")
//    public String register(@RequestBody Map<String, String> body) {
//        String username = body.get("username");
//        String password = body.get("password");
//        boolean isManager = Boolean.parseBoolean(body.get("isManager"));
//        String secret = body.get("secret");
//
//        return authService.register(username, password, isManager, secret);
//    }
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${employee.service.url}")
    private String employeeServiceUrl;

    AuthController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        // 1. Set role if missing
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("EMPLOYEE");
        }

        // 2. Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 3. Save user in Auth DB
        User saved = userRepository.save(user);

        // 4. Prepare employee payload
        Map<String, Object> emp = new HashMap<>();
        emp.put("id", saved.getId());
        emp.put("name", saved.getUsername());
        emp.put("email", saved.getEmail());    // <-- NEW FIELD
        emp.put("role", saved.getRole());

        // 5. Sync with EmployeeService
        restTemplate.postForObject(
            employeeServiceUrl + "/api/employees/create",
            emp,
            String.class
        );

        return saved;
    }



  

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        User user = authService.login(username, password);

        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("status", "FAIL");
        } else {
            response.put("status", "SUCCESS");
            response.put("id", user.getId());  // ADD THIS
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
        }

        return response;
    }

}

