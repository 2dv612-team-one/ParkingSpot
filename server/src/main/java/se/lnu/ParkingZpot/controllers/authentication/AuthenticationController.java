package se.lnu.ParkingZpot.controllers.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.authentication.JwtAuthenticationResponse;
import se.lnu.ParkingZpot.payloads.authentication.LoginRequest;
import se.lnu.ParkingZpot.payloads.authentication.RegistrationRequest;
import se.lnu.ParkingZpot.repositories.RoleRepository;
import se.lnu.ParkingZpot.repositories.UserRepository;
import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.services.EmailService;
import se.lnu.ParkingZpot.services.EmailServiceImpl;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private EmailService emailService;

    @GetMapping("/validate")
    public ResponseEntity validateToken(@RequestParam("token") String authToken) {
      boolean validToken = tokenProvider.validateToken(authToken);

      if (validToken) {
        return new ResponseEntity(new ApiResponse(true, "Token is valid"), HttpStatus.OK);
      } else {
        return new ResponseEntity(new ApiResponse(false, "Token is invalid"), HttpStatus.FORBIDDEN);
      }

    }

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(),
                loginRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        if (userRepository.existsByUsername(registrationRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username already exists"), HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "This email address is already in use"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new ApplicationException("No user role exists"));

        user.setUserRoles(Collections.singleton(userRole));

        User savedUser = userRepository.save(user);

        URI userLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(savedUser.getUsername()).toUri();

        try {
            emailService.sendWelcomeEmail(savedUser);
        } catch (Exception e) {
            // TODO: Error log?
            System.err.println("Welcome  email could not be sent: " + e.getMessage());
        }

        return ResponseEntity.created(userLocation).body(new ApiResponse(true, "User successfully registered"));
    }
}
