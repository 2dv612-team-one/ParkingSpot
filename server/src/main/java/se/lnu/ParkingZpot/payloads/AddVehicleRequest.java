package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AddVehicleRequest {

  public String accessToken;

  private String registrationNumber;

}
