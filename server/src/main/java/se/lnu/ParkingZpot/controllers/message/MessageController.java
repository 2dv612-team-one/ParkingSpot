package se.lnu.ParkingZpot.controllers.message;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.payloads.AddMessageRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.services.MessageService;

@RestController
@RequestMapping("/api/message")
public class MessageController {

  private final MessageService messageService;

  @Autowired
  public MessageController(MessageService messageService) {
    this.messageService = messageService;
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

}
