package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AddVehicleRequest {

  private int user_id;

  private String registration_number;
}
