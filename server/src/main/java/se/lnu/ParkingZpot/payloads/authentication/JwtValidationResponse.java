package se.lnu.ParkingZpot.payloads.authentication;

import lombok.Getter;
import lombok.Setter;
import se.lnu.ParkingZpot.models.Role;

import java.util.Set;

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
