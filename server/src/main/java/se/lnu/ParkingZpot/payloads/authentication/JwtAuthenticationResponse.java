package se.lnu.ParkingZpot.payloads.authentication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private String role;

  public JwtAuthenticationResponse(String accessToken, String role) {
    this.accessToken = accessToken;
    this.role = role;
  }
}
