package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Message;
import se.lnu.ParkingZpot.models.ParkingSpot;
import se.lnu.ParkingZpot.repositories.ParkingSpotRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.exceptions.NoSuchEntityException;
import se.lnu.ParkingZpot.payloads.Messages;
import se.lnu.ParkingZpot.payloads.InternalMessages;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.util.Optional;
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
    return parkingSpotRepository.findAll();
  }

  @Override
  public List<ParkingSpot> getAllParkingSpotsBelongingToUser(Long userId) {
    return parkingSpotRepository.findAllByUserId(userId);
  }

  @Override
  public Optional<ParkingSpot> getParkingSpot(long id) {
    return parkingSpotRepository.findById(id);
  }

  @Override
  public ParkingSpot getParkingSpot(String name) {
    return parkingSpotRepository.findByName(name);
  }

  @Override
  public ParkingSpot addParkingSpot(long userId, String name, int[] coords) throws EntityExistsException {
    if (parkingSpotRepository.existsByName(name)) {
      throw new EntityExistsException(Messages.entityExists(Messages.PSPOT));
    }
    ParkingSpot parkingSpot = new ParkingSpot(userId, name, coords);
    return parkingSpotRepository.save(parkingSpot);
  }

  @Override
  public ParkingSpot updateParkingSpot(ParkingSpot parkingSpot) throws EntityNotFoundException {
    return parkingSpotRepository.save(parkingSpot);
  }

  @Override
  public boolean deleteParkingSpot(String name) {
    Optional<ParkingSpot> deletedSpot = parkingSpotRepository.findById(parkingSpotRepository.deleteByName(name));
    return deletedSpot.isPresent();
  }
}
