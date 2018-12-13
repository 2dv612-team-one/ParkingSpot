package se.lnu.ParkingZpot.controllers.message;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.models.Message;
import se.lnu.ParkingZpot.payloads.AddMessageRequest;
import se.lnu.ParkingZpot.payloads.ConfirmMessageRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.services.IMessageService;
import se.lnu.ParkingZpot.services.UserService;

@RestController
@RequestMapping("/api/message")
public class MessageController {

  private final IMessageService messageService;
  private final UserService userService;
  private final PasswordEncoder encoder;

  @Autowired
  public MessageController(UserService userService, PasswordEncoder encoder, IMessageService messageService) {
    this.messageService = messageService;
    this.userService = userService;
    this.encoder = encoder;
  }

  @PostMapping("/send")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse> addMessage(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody AddMessageRequest addMessageRequest) {

    try {
        this.messageService.addMessage(addMessageRequest.getMsg());
        return new ResponseEntity<>(new ApiResponse(true, "Message sent"), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/confirm")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<ApiResponse> confirmMessage(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody ConfirmMessageRequest confirmMessageRequest) {

    try {
        Long id = confirmMessageRequest.getId();
        Message m = this.messageService.findById(id).get();
        List<Long> blacklist = m.getBlacklist();
        blacklist.add(principal.getId());
        this.messageService.updateMessage(m);
        return new ResponseEntity<>(new ApiResponse(true, "Message confirmed viewed"), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/unseen")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<List<Message>> getUnseenMessages(@CurrentUser UserDetailsImpl principal) {
    return new ResponseEntity<>(messageService.getAllUnseenMessages(principal.getId()), HttpStatus.OK);
  }

}
