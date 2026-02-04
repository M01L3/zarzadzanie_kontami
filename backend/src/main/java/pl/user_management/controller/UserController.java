package pl.user_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import pl.user_management.dto.UserDto;
import pl.user_management.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<UserDto> all() {
        return repo.findAll().stream()
                .map(u -> new UserDto(u.getId(), u.getUsername(), u.getRole()))
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return repo.findById(id)
            .map(user -> {
                repo.delete(user);
                return ResponseEntity.ok().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UserDto dto) {
        return repo.findById(id)
            .map(user -> {
                user.setUsername(dto.username());
                user.setRole(dto.role());
                repo.save(user);
                return ResponseEntity.ok(dto);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}