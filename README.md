System Zarządzania Użytkownikami
Projekt obejmuje implementację pełnowymiarowej aplikacji webowej do zarządzania kontami użytkowników, składającej się z backendu w technologii Spring Boot oraz frontendowej aplikacji w bibliotece React. Całość została przygotowana do łatwego uruchomienia za pomocą kontenerów Docker.

Funkcjonalności systemu
Rejestracja i uwierzytelnianie: Tworzenie nowych kont oraz logowanie z wykorzystaniem tokenów JWT (JSON Web Token).

Zarządzanie użytkownikami (CRUD): Przeglądanie listy użytkowników, usuwanie kont oraz modyfikacja uprawnień (ról).

System ról: Podział na użytkowników standardowych (USER) oraz administratorów (ADMIN) z różnym zakresem dostępnych akcji.

Walidacja danych: Kontrola poprawności danych wejściowych zarówno po stronie klienta, jak i serwera.

Technologie i architektura
Backend: Java 17, Spring Boot 3, Spring Security, Hibernate/JPA.

Frontend: React 18, React Router v6, Axios, Context API.

Baza danych: H2 Database (In-memory).

Konteneryzacja: Docker, Docker Compose.

Bezpieczeństwo: Szyfrowanie haseł algorytmem BCrypt, bezstanowa autoryzacja Bearer Token, zabezpieczenie przed atakami typu XSS oraz CSRF.

Instrukcja uruchomienia (Docker)
Wymagane jest posiadanie zainstalowanego środowiska Docker oraz Docker Compose.

Pobierz kod źródłowy projektu.

Otwórz terminal w folderze głównym projektu (tam, gdzie znajduje się plik docker-compose.yml).

Uruchom aplikację komendą:

Bash
docker-compose up --build
Po poprawnym uruchomieniu kontenerów:

Frontend jest dostępny pod adresem: http://localhost:3000

Backend API jest dostępny pod adresem: http://localhost:8080

Dostęp do bazy danych (H2 Console)
Baza danych działa w trybie in-memory (w pamięci RAM), co zapewnia wysoką wydajność i brak konieczności zewnętrznej instalacji silnika bazy danych.

Aby uzyskać dostęp do interfejsu zarządzania bazą:

Przejdź pod adres: http://localhost:8080/h2-console

W polu JDBC URL usuń domyślną wartość i wprowadź dokładnie: jdbc:h2:mem:testdb

Pozostałe pola (User Name: sa, Password: puste) pozostaw bez zmian.

Kliknij przycisk "Connect".

Założenia projektowe
Responsywność: Interfejs użytkownika został zaprojektowany w oparciu o elastyczne siatki (Flexbox/Grid), dzięki czemu aplikacja jest w pełni responsywna na urządzeniach mobilnych, tabletach i komputerach.

Dostępność: Wykorzystano semantyczne tagi HTML, co zapewnia wsparcie dla czytników ekranowych.

Jakość kodu: Projekt został podzielony na moduły (kontrolery, serwisy, repozytoria, DTO), co ułatwia jego utrzymanie i ewentualną rozbudowę.