package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteParkingSpotRequest {

  public String accessToken;
  private String name;
  
}
