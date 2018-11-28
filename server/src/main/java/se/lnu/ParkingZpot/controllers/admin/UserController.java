package se.lnu.ParkingZpot.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.authentication.RegistrationRequest;
import se.lnu.ParkingZpot.services.EmailService;
import se.lnu.ParkingZpot.services.RoleService;
import se.lnu.ParkingZpot.services.UserService;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;

@Secured({"ROLE_ADMIN"})
@RestController
@RequestMapping("/api/admin")
public class UserController {

  private final UserService userService;
  private final RoleService roleService;
  private final EmailService emailService;
  private final PasswordEncoder passwordEncoder;


  @Autowired
  public UserController(UserService userService, RoleService roleService, EmailService emailService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.roleService = roleService;
    this.emailService = emailService;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/user/register")
  public ResponseEntity registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
    if (userService.existsByUsername(registrationRequest.getUsername())) {
      return new ResponseEntity(new ApiResponse(false, "Username already exists"), HttpStatus.BAD_REQUEST);
    }

    if (userService.existsByEmail(registrationRequest.getEmail())) {
      return new ResponseEntity(new ApiResponse(false, "This email address is already in use"), HttpStatus.BAD_REQUEST);
    }

    User user = new User(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword());
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Set<Role> userRoles = new HashSet<>();

    if (registrationRequest.getRoles().isPresent()) {
      for (Role role : registrationRequest.getRoles().get()) {
        userRoles.add(roleService.findByName(role.getName()).orElseThrow(() -> new ApplicationException("No user role exists")));
      }
    }

    user.setUserRoles(userRoles);

    User savedUser = userService.saveUser(user);

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
