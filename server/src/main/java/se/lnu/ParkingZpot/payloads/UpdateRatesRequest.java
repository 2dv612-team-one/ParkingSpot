package se.lnu.ParkingZpot.payloads;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import se.lnu.ParkingZpot.models.Rate;

@Getter
@Setter
public class UpdateRatesRequest {
  private List<Rate> rates;
}
