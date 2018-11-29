package se.lnu.ParkingZpot.controllers.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import java.io.UnsupportedEncodingException;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.VerificationToken;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.authentication.JwtAuthenticationResponse;
import se.lnu.ParkingZpot.payloads.authentication.JwtValidationResponse;
import se.lnu.ParkingZpot.payloads.authentication.LoginRequest;
import se.lnu.ParkingZpot.payloads.authentication.RegistrationRequest;
import se.lnu.ParkingZpot.services.UserService;
import se.lnu.ParkingZpot.services.RoleService;
import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.services.EmailService;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.payloads.InternalMessages;

import javax.validation.Valid;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;

  @Autowired
  public AuthenticationController(AuthenticationManager authenticationManager, UserService userService, RoleService roleService, JwtTokenProvider tokenProvider, EmailService emailService) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.roleService = roleService;
    this.tokenProvider = tokenProvider;
    this.emailService = emailService;
  }

  @GetMapping("/validate")
    public ResponseEntity<JwtValidationResponse> validateToken(@RequestParam("token") String authToken) {
      boolean validToken = tokenProvider.validateToken(authToken);

      if (validToken) {
        Optional<Role> userRole = roleService.findByName("ROLE_USER");
        Optional<Role> adminRole = roleService.findByName("ROLE_ADMIN");

        User currentUser = userService.getUser(tokenProvider.getUserIdFromJWT(authToken)).get();

        return new ResponseEntity<JwtValidationResponse>(new JwtValidationResponse(true,
          userService.getUserRole(currentUser).get().getName()), HttpStatus.OK);

      }
      return new ResponseEntity<JwtValidationResponse>(new JwtValidationResponse(false, ""), HttpStatus.FORBIDDEN);
    }

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(),
                loginRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        User user = userService.getUser(tokenProvider.getUserIdFromJWT(jwt)).get();

        if (user.isEnabled() == true) {
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, "ROLE_USER"));
        } else {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.LOGIN_UNVERIFIED), HttpStatus.UNAUTHORIZED);
        }


    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        try {
            Set<Role> roles = new HashSet<Role>();

            if (registrationRequest.getRoles() != null && registrationRequest.getRoles().isPresent()) {
                for (Role role : registrationRequest.getRoles().get()) {
                    roles.add(role);
                  }
            }

            User savedUser = userService.registerNewUserAccount(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword(), roles);

            URI basePathLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().port(port).build().toUri();
            basePathLocation = basePathLocation.resolve("/api/auth/confirm/");

            emailService.sendVerificationEmail(savedUser, basePathLocation);

            URI userLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(savedUser.getUsername()).toUri();

            return ResponseEntity.created(userLocation).body(new ApiResponse(true, Messages.REG_SUCCESS));
        } catch (EntityExistsException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (ApplicationException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (UnsupportedEncodingException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.REG_MAILFAIL), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Value("${app.port}") String port;
    @GetMapping("/confirm")
    public ResponseEntity confirmUser(@RequestParam("token") String token, HttpServletResponse httpResponse) {

        VerificationToken verificationToken = userService.getVerificationToken(token);

        if (verificationToken == null || verificationToken.getExpiryDate().before(new Date())) {
            if (verificationToken != null) {
                userService.deleteVerificationToken(verificationToken);
            }
            return new ResponseEntity<String>(Messages.VERIFY_FAIL, HttpStatus.EXPECTATION_FAILED);
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userService.saveUser(user);
        userService.deleteVerificationToken(verificationToken);

        String basePathLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().port(port).build().toString();

        try {
            httpResponse.sendRedirect(basePathLocation);
        } catch (IOException e) {
            logger.error(InternalMessages.ERROR_REG_VERIFICATION_REDIRECT);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.REG_VERIFICATION_REDIRECT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
    }
}
