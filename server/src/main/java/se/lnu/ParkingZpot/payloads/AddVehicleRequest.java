package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Getter
@Setter
public class AddVehicleRequest {
  
  @NotBlank
  private String registrationNumber;

  private Optional<String> id;
}
