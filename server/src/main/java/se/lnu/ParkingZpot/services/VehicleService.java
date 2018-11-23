package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.Vehicle;

import java.util.List;

@Service
public interface VehicleService {
  List<Vehicle> getAllVehicles();
  Vehicle addVehicles(Vehicle vehicle);
}
