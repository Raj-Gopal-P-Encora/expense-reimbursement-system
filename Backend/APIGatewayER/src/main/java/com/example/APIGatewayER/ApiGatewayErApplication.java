package com.example.APIGatewayER;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayErApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayErApplication.class, args);
	}

}
