package se.lnu.ParkingZpot.controllers.crud;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.services.UserService;

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

    if(!userService.deleteUser(principal)) {
      return new ResponseEntity<>(new ApiResponse(true, Messages.USER_DEL_SUCCESS), HttpStatus.OK);
    }

    return new ResponseEntity<>(new ApiResponse(false, Messages.USER_DEL_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
