package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Parking;
import se.lnu.ParkingZpot.models.ParkingArea;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.repositories.ParkingRepository;
import se.lnu.ParkingZpot.exceptions.BadRequestException;
import se.lnu.ParkingZpot.payloads.InternalMessages;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import java.util.Optional;

@Component
public class ParkingService implements IParkingService {

  private final ParkingRepository parkingRepository;

  @Autowired
  public ParkingService(ParkingRepository parkingRepository) {
    this.parkingRepository = parkingRepository;
  }

  @Override
  public List<Parking> getAllParkings() {
    return parkingRepository.findAll();
  }

  @Override
  public Optional<Parking> getParking(long ID) {
    return parkingRepository.findById(ID);
  }

  @Override
  public Parking addParking(ParkingArea area, Vehicle vehicle, long user_id) throws BadRequestException {

    if (vehicle.getParked_at() != null) {
      throw new BadRequestException(InternalMessages.ERROR_VEHICLE_PARKED);
    }

    if (area.getParked_at() != null) {
      throw new BadRequestException(InternalMessages.ERROR_AREA_IN_USE);
    }

    Parking parking = new Parking(user_id, vehicle, area);
    return parkingRepository.save(parking);
  }

  @Override
  public boolean deleteParking(long parkingID) {
    return parkingRepository.findById(parkingRepository.deleteById(parkingID)) != null;
  }
}