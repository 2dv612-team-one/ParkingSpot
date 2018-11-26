package se.lnu.ParkingZpot.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class EntityExistsException extends RuntimeException {

    public EntityExistsException(String message) {
      super(message);
  }

  public EntityExistsException(String message, Throwable cause) {
      super(message, cause);
  }
}
