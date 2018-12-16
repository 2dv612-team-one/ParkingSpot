package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.Parking;
import se.lnu.ParkingZpot.models.ParkingArea;
import se.lnu.ParkingZpot.models.Vehicle;

import java.util.List;
import java.util.Optional;

@Service
public interface IParkingService {
  List<Parking> getAllParkings();
  Optional<Parking> getParking(long id);
  Parking addParking(ParkingArea area, Vehicle vehicle, long user_id);
  boolean deleteParking(long id);
}