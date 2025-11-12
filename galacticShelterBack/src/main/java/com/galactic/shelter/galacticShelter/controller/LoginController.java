package com.galactic.shelter.galacticShelter.controller;


import com.galactic.shelter.galacticShelter.model.User;
import com.galactic.shelter.galacticShelter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/auth/login")
    public ResponseEntity<User> getCurrentUser(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        org.springframework.security.core.userdetails.User username = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
        User user = userRepository.findByUsername(username.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }
}
