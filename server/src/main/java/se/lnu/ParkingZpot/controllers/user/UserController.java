package se.lnu.ParkingZpot.controllers.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.payloads.UpdateUserEmailRequest;
import se.lnu.ParkingZpot.payloads.UpdateUserPasswordRequest;
import se.lnu.ParkingZpot.services.UserService;

import javax.validation.Valid;
import java.util.Optional;

import static se.lnu.ParkingZpot.payloads.Messages.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @DeleteMapping("/delete")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<ApiResponse> deleteUser(@CurrentUser UserDetailsImpl principal) {

    if (userService.deleteUser(principal)) {
      return new ResponseEntity<>(new ApiResponse(true, Messages.USER_DEL_SUCCESS), HttpStatus.OK);
    }

    return new ResponseEntity<>(new ApiResponse(false, Messages.USER_DEL_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @PutMapping("/update")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<ApiResponse> updateUserPassword(@CurrentUser UserDetailsImpl principal,
                                                @Valid @RequestBody UpdateUserPasswordRequest updateUserPasswordRequest) {
    Optional<User> user = userService.getUser(principal.getId());

    if (user.isPresent()) {
      if (userService.changeUserPassword(user.get(), updateUserPasswordRequest.getPassword())) {
        return new ResponseEntity<>(new ApiResponse(true, USER_UPDATE_SUCCESS), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(new ApiResponse(false, USER_PASSWORD_UPDATE_FAIL_SAME), HttpStatus.BAD_REQUEST);
      }
    }
    return new ResponseEntity<>(new ApiResponse(false, USER_NOT_FOUND), HttpStatus.NOT_FOUND);
  }

  @PutMapping("/update/email")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<ApiResponse> updateUserEmail(@CurrentUser UserDetailsImpl principal,
                                                @Valid @RequestBody UpdateUserEmailRequest updateUserEmailRequest) {
    Optional<User> user = userService.getUser(principal.getId());

    if (user.isPresent()) {
      if (userService.changeUserEmail(user.get(), updateUserEmailRequest.getEmail())) {
        return new ResponseEntity<>(new ApiResponse(true, USER_UPDATE_SUCCESS), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(new ApiResponse(false, USER_EMAIL_UPDATE_FAIL), HttpStatus.BAD_REQUEST);
      }
    }
    return new ResponseEntity<>(new ApiResponse(false, USER_NOT_FOUND), HttpStatus.NOT_FOUND);
  }

}
