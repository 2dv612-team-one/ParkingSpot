package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateParkingAreaRequest {
  private String name;
  private double[] coords;
}
