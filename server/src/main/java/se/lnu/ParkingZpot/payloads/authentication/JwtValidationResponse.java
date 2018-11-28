package se.lnu.ParkingZpot.payloads.authentication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtValidationResponse {

  private boolean isValid;
  private String role;

  public JwtValidationResponse(boolean isValid, String role) {
    this.isValid = isValid;
    this.role = role;
  }
}
