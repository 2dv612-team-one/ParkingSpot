package se.lnu.ParkingZpot.controllers.authentication;

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
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.VerificationToken;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.authentication.JwtAuthenticationResponse;
import se.lnu.ParkingZpot.payloads.authentication.LoginRequest;
import se.lnu.ParkingZpot.payloads.authentication.RegistrationRequest;
import se.lnu.ParkingZpot.services.IUserService;
import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.services.EmailService;

import javax.validation.Valid;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private EmailService emailService;

    @GetMapping("/validate")
    public ResponseEntity validateToken(@RequestParam("token") String authToken) {
      boolean validToken = tokenProvider.validateToken(authToken);

      if (validToken) {
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Token is valid"), HttpStatus.OK);
      } else {
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Token is invalid"), HttpStatus.FORBIDDEN);
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
        Long id = tokenProvider.getUserIdFromJWT(jwt);
        User user = userService.getUser(id).get();

        user.setEnabled(false);

        if (user.getEnabled() == true) {
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } else {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User is not verified."), HttpStatus.UNAUTHORIZED);
        }

        
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {

        String role = "User"; //TODO: Get from registration request
        User savedUser;

        try {
            savedUser = userService.registerNewUserAccount(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword(), role);

            URI basePathLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().port(port).build().toUri();
            basePathLocation = basePathLocation.resolve("/api/auth/confirm/");
            
            emailService.sendVerificationEmail(savedUser, basePathLocation);

            URI userLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(savedUser.getUsername()).toUri();

            return ResponseEntity.created(userLocation).body(new ApiResponse(true, "User successfully registered"));
        } catch (EntityExistsException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (ApplicationException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Verification email could not be sent."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Value("${app.port}") String port;
    @GetMapping("/confirm")
    public ResponseEntity<ApiResponse> confirmUser(@RequestParam("token") String token, HttpServletResponse httpResponse) {

        //TODO: Handle expired and nonexistant tokens
        VerificationToken verificationToken = userService.getVerificationToken(token);

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userService.saveRegisteredUser(user);
        userService.deleteVerificationToken(verificationToken);

        String basePathLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().port(port).build().toString();

        try {
            httpResponse.sendRedirect(basePathLocation);
        } catch (IOException e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Verification redirect went wrong."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
    }
}
