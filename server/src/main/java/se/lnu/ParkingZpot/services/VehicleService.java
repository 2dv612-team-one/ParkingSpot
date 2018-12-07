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
  public Vehicle addVehicle(long userId, String registrationNumber) throws EntityExistsException {
    if (vehicleRepository.existsByRegistrationNumber(registrationNumber)) {
      throw new EntityExistsException(Messages.entityExists(Messages.VEHICLE));
    }
    Vehicle vehicle = new Vehicle(userId, registrationNumber);
    return vehicleRepository.save(vehicle);
  }

  @Override
  public boolean deleteVehicle(String regNum, Long userId) {
    if (vehicleRepository.getByRegistrationNumber(regNum).isPresent() && (vehicleRepository.getByRegistrationNumber(regNum).get().getUser_Id() == userId)) {
      Optional<Vehicle> deletedVehicle = vehicleRepository.findById(vehicleRepository.deleteByRegistrationNumber(regNum));
      return deletedVehicle.isPresent();
    }

    return false;
    
  }
}
