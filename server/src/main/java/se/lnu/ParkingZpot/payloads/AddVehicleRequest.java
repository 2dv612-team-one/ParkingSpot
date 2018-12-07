package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class AddVehicleRequest {
  
  private String registrationNumber;

  private Optional<String> id;
}
