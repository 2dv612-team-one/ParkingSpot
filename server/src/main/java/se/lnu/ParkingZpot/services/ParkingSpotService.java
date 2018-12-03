package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.ParkingSpot;
import se.lnu.ParkingZpot.repositories.ParkingSpotRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;

@Component
public class ParkingSpotService implements IParkingSpotService {

  private final ParkingSpotRepository parkingSpotRepository;

  @Autowired
  public ParkingSpotService(ParkingSpotRepository parkingSpotRepository) {
    this.parkingSpotRepository = parkingSpotRepository;
  }

  @Override
  public List<ParkingSpot> getAllParkingSpots() {
    return vparkingSpotRepository.findAll();
  }


  @Override
  public ParkingSpot addParkingSpots(long userId, String name, int[] coords) throws EntityExistsException {
    if (parkingSpotRepository.existsByName(name)) {
      throw new EntityExistsException(Messages.entityExists(Messages.PSPOT));
    }
    ParkingSpot parkingSpot = new ParkingSpot(userId, name, coords);
    return parkingSpotRepository.save(parkingSpot);
  }
}
