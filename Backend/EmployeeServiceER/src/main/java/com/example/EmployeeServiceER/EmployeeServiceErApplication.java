package com.example.EmployeeServiceER;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EmployeeServiceErApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeServiceErApplication.class, args);
	}

}
