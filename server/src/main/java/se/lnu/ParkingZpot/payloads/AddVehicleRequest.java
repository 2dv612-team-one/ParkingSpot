package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddVehicleRequest {

  public String accessToken;

  private String registrationNumber;

}
