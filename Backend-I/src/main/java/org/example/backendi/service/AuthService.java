package org.example.backendi.service;

import org.example.backendi.model.User;
import org.example.backendi.model.dto.LoginRequest;
import org.example.backendi.model.dto.SignupRequest;
import org.example.backendi.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public void signup(SignupRequest request) {
        User existing = userRepository.findByPhone(request.phone());
        if (existing != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setName(request.name());
        user.setPhone(request.phone());

        user.setPassword(request.password());

        userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByPhone(request.phone());
        if (user == null || !user.getPassword().equals(request.password())) {
            throw new RuntimeException("Invalid phone or password");
        }
        return user;
    }
}
