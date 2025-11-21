package com.example.AuthServiceER.model;

public class LoginResponse {

    private String status;
    private Long id;
    private String username;
    private String role;

    public LoginResponse(String status, Long id, String username, String role) {
        this.status = status;
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}

