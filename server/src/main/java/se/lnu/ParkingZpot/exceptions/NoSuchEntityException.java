package se.lnu.ParkingZpot.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class NoSuchEntityException extends RuntimeException {
    public static final long serialVersionUID = 1L;

    public NoSuchEntityException(String message) {
      super(message);
  }

  public NoSuchEntityException(String message, Throwable cause) {
      super(message, cause);
  }
}
