package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest {
  String password;
}
