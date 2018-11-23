package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.repositories.VehicleRepository;

import java.util.List;

@Component
public class VehicleServiceImpl implements VehicleService {

  private final VehicleRepository vehicleRepository;

  @Autowired
  public VehicleServiceImpl(VehicleRepository vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  @Override
  public List<Vehicle> getAllVehicles() {
    return vehicleRepository.findAll();
  }


  @Override
  public Vehicle addVehicles(Vehicle vehicle) {
    return vehicleRepository.save(vehicle);
  }
}
