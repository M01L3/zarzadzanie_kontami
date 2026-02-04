package pl.user_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.user_management.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
