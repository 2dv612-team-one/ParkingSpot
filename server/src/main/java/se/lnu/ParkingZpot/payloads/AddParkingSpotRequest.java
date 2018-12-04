package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Getter
@Setter
public class AddParkingSpotRequest {
  
  @NotBlank
  private String name;

  @NotBlank
  private int[] coords;

  private Optional<String> id;

}
