package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddParkingSpotRequest {

  public String accessToken;
  private String name;
  private int[] coords;

}
