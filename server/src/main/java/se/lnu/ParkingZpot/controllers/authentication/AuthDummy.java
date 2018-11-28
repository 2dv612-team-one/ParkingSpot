package se.lnu.ParkingZpot.controllers.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lnu.ParkingZpot.repositories.UserRepository;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;

@RestController
@RequestMapping("/api")
public class AuthDummy {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String hello(@CurrentUser UserDetailsImpl principal) {
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
