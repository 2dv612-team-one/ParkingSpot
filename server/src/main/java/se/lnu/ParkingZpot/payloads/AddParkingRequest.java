package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class AddParkingRequest {
  
  private String registrationNumber;

  private String areaID;

  private Optional<String> id;
}
