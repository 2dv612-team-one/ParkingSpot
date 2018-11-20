package se.lnu.ParkingZpot.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lnu.ParkingZpot.security.repository.UserRepository;
import se.lnu.ParkingZpot.security.security.CurrentUser;
import se.lnu.ParkingZpot.security.security.UserPrincipal;

@RestController
@RequestMapping("/api")
public class AuthDummy {

    private final UserRepository userRepository;

    @Autowired
    public AuthDummy(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public String hello(@CurrentUser UserPrincipal principal) {
        if (principal != null) {
            return "Hello there, " + principal.getUsername();
        } else {
            return "booo";
        }
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String helloUser() {
        return "Hello, you are a user indeed!";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String helloAdmin() {
        return "Hello, you are an admin indeed!";
    }

}
