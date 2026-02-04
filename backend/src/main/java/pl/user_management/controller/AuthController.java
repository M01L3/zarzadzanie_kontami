package pl.user_management.controller;

import org.springframework.web.bind.annotation.*;
import pl.user_management.dto.*;
import pl.user_management.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest req) {
        service.register(req);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}
