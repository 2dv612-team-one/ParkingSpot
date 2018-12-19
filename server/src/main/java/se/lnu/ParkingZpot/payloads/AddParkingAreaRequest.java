package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class AddParkingAreaRequest {

  private String name;

  private String wkt;

  private Optional<String> id;

}
