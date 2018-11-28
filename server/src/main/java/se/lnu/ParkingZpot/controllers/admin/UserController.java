package se.lnu.ParkingZpot.controllers.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
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

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  private final UserService userService;
  private final RoleService roleService;
  private final EmailService emailService;

  @Autowired
  public UserController(UserService userService, RoleService roleService, EmailService emailService) {
    this.userService = userService;
    this.roleService = roleService;
    this.emailService = emailService;
  }

  @PostMapping("/user/register")
  public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
    User savedUser;

    try {
        Set<Role> userRoles = new HashSet<Role>();

        if (registrationRequest.getRoles().isPresent()) {
          for (Role role : registrationRequest.getRoles().get()) {
            userRoles.add(roleService.findByName(role.getName()).orElseThrow(() -> new ApplicationException("No such user role exists: " + role.getName())));
          }
        }

        savedUser = userService.registerNewUserAccount(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword(), userRoles);
        savedUser.setEnabled(true);
        
        emailService.sendEmailTo(savedUser, "Welcome to the Parking Zpot application", "You have been signed up to the Parking Zpot service by an administrator.");

        URI userLocation = ServletUriComponentsBuilder
            .fromCurrentContextPath().path("/api/users/{username}")
            .buildAndExpand(savedUser.getUsername()).toUri();

        return ResponseEntity.created(userLocation).body(new ApiResponse(true, "User successfully registered"));
    } catch (EntityExistsException e) {
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    } catch (ApplicationException e) {
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
        logger.error("Welcome email could not be sent.");
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
