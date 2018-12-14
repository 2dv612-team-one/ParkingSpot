package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.Vehicle;

import java.util.List;
import java.util.Optional;

@Service
public interface IVehicleService {
  List<Vehicle> getAllVehicles();
  Optional<Vehicle> getVehicle(String regNum);
  Vehicle addVehicle(long userId, String registrationNumber);
  boolean deleteVehicle(String regNum);
}
