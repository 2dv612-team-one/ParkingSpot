package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class AddParkingSpotRequest {
  
  private String name;

  private int[] coords;

  private Optional<String> id;

}
