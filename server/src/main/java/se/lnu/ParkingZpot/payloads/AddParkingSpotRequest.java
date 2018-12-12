package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class AddParkingSpotRequest {
  
  private String name;

  private double[] coords;

  private Optional<String> id;

}
