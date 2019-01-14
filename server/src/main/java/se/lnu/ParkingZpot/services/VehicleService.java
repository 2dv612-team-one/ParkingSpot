package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.repositories.VehicleRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import java.util.Optional;

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
  public Optional<Vehicle> getVehicle(String regNum) {
    return vehicleRepository.getByRegistrationNumber(regNum);
  }

  public List<Vehicle> getAllVehiclesBelongingToUser(long userId) {
    return vehicleRepository.findAllByUserId(userId);
  }

  @Override
  public Vehicle addVehicle(long userId, String registrationNumber) throws EntityExistsException {
    if (vehicleRepository.existsByRegistrationNumber(registrationNumber)) {
      throw new EntityExistsException(Messages.entityExists(Messages.VEHICLE));
    }
    Vehicle vehicle = new Vehicle(userId, registrationNumber);
    return vehicleRepository.save(vehicle);
  }

  @Override
  public boolean deleteVehicle(String regNum) {
    return vehicleRepository.findById(vehicleRepository.deleteByRegistrationNumber(regNum)) != null;
  }
}
