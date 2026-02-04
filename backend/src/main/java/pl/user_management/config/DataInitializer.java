package pl.user_management.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.user_management.model.User;
import pl.user_management.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository repository, PasswordEncoder encoder) {
        return args -> {
            if (repository.count() == 0) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin"));
                admin.setRole("ADMIN");
                repository.save(admin);
                System.out.println("Pierwszy administrator został utworzony: admin / admin");
            }
        };
    }
}