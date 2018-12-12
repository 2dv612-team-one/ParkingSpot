package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateParkingSpotRequest {

  private long id;
  private String name;
  private double[] coords;

}
