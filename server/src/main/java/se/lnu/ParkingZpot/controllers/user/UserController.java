package se.lnu.ParkingZpot.controllers.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.payloads.UpdateUserRequest;
import se.lnu.ParkingZpot.services.UserService;

import javax.validation.Valid;
import java.util.Optional;

import static se.lnu.ParkingZpot.payloads.Messages.USER_NOT_FOUND;
import static se.lnu.ParkingZpot.payloads.Messages.USER_PASSWORD_UPDATE_FAIL_SAME;
import static se.lnu.ParkingZpot.payloads.Messages.USER_UPDATE_SUCCESS;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;
  private final PasswordEncoder encoder;

  @Autowired
  public UserController(UserService userService, PasswordEncoder encoder) {
    this.userService = userService;
    this.encoder = encoder;
  }

  @DeleteMapping("/delete")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<ApiResponse> deleteUser(@CurrentUser UserDetailsImpl principal) {

    if(userService.deleteUser(principal)) {
      return new ResponseEntity<>(new ApiResponse(true, Messages.USER_DEL_SUCCESS), HttpStatus.OK);
    }

    return new ResponseEntity<>(new ApiResponse(false, Messages.USER_DEL_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @PutMapping("/update")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<ApiResponse> updateUser(@CurrentUser UserDetailsImpl principal,
                                                @Valid @RequestBody UpdateUserRequest updateUserRequest) {
    Optional<User> user = userService.getUser(principal.getId());

    if (user.isPresent()) {
      if (encoder.matches(updateUserRequest.getPassword(), user.get().getPassword())) {
        return new ResponseEntity<>(new ApiResponse(false, USER_PASSWORD_UPDATE_FAIL_SAME), HttpStatus.BAD_REQUEST);
      }

      user.get().setPassword(encoder.encode(updateUserRequest.getPassword()));
      userService.updateUser(user.get());

      return new ResponseEntity<>(new ApiResponse(true, USER_UPDATE_SUCCESS), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(new ApiResponse(false, USER_NOT_FOUND), HttpStatus.NOT_FOUND);
    }
  }

}
