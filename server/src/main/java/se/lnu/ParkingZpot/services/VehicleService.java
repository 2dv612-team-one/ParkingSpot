package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.repositories.VehicleRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;

@Component
public class VehicleService implements IVehicleService {

  private final VehicleRepository vehicleRepository;

  @Autowired
  public VehicleService(VehicleRepository vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  @Override
  public List<Vehicle> getAllVehicles() {
    return vehicleRepository.findAll();
  }


  @Override
  public Vehicle addVehicles(long userId, String registrationNumber) throws EntityExistsException {
    if (vehicleRepository.existsByRegistrationNumber(registrationNumber)) {
      throw new EntityExistsException(Messages.entityExists(Messages.VEHICLE));
    }
    Vehicle vehicle = new Vehicle(userId, registrationNumber);
    return vehicleRepository.save(vehicle);
  }
}
