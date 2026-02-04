package pl.user_management.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.user_management.dto.*;
import pl.user_management.model.User;
import pl.user_management.repository.UserRepository;
import pl.user_management.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Transactional
    public void register(RegisterRequest req) {
        System.out.println("Próba rejestracji użytkownika: " + req.getUsername());

        if (repo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Użytkownik o nazwie " + req.getUsername() + " już istnieje!");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        
        user.setPassword(encoder.encode(req.getPassword()));
        
        String role = (req.getRole() == null || req.getRole().isEmpty()) ? "USER" : req.getRole();
        user.setRole(role.toUpperCase());
        
        repo.save(user);
        System.out.println("Użytkownik zapisany pomyślnie w bazie H2!");
    }

    public String login(LoginRequest req) {
        System.out.println("Próba logowania: " + req.getUsername());

        User user = repo.findByUsername(req.getUsername())
                .orElseThrow(() -> {
                    System.out.println("BŁĄD: Nie znaleziono użytkownika: " + req.getUsername());
                    return new RuntimeException("Nieprawidłowy login lub hasło");
                });

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            System.out.println("BŁĄD: Hasło nie pasuje dla: " + req.getUsername());
            throw new RuntimeException("Nieprawidłowy login lub hasło");
        }

        System.out.println("Logowanie udane! Generuję token dla: " + req.getUsername());
        return JwtUtil.generateToken(user.getUsername(), user.getRole());
    }
}