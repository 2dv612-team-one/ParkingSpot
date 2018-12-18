package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class UpdateUserPasswordRequest {
  String password;
}
