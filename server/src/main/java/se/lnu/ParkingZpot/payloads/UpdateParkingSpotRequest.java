package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateParkingSpotRequest {
  private String name;
  private double[] coords;
}
