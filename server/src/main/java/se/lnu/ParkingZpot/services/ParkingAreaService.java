package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.ParkingArea;
import se.lnu.ParkingZpot.repositories.ParkingAreaRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.payloads.Messages;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.List;

@Component
public class ParkingAreaService implements IParkingAreaService {

  private final ParkingAreaRepository parkingAreaRepository;

  @Autowired
  public ParkingAreaService(ParkingAreaRepository parkingAreaRepository) {
    this.parkingAreaRepository = parkingAreaRepository;
  }

  @Override
  public List<ParkingArea> getAllParkingAreas() {
    return parkingAreaRepository.findAll();
  }

  @Override
  public List<ParkingArea> getAllParkingAreasBelongingToUser(Long userId) {
    return parkingAreaRepository.findAllByUserId(userId);
  }

  @Override
  public Optional<ParkingArea> getParkingArea(long id) {
    return parkingAreaRepository.findById(id);
  }

  @Override
  public ParkingArea getParkingArea(String name) {
    return parkingAreaRepository.findByName(name);
  }

  @Override
  public ParkingArea addParkingArea(long userId, String name, double[] coords) throws EntityExistsException {
    if (parkingAreaRepository.existsByName(name)) {
      throw new EntityExistsException(Messages.entityExists(Messages.PArea));
    }
    ParkingArea parkingArea = new ParkingArea(userId, name, coords);
    return parkingAreaRepository.save(parkingArea);
  }

  @Override
  public ParkingArea updateParkingArea(ParkingArea parkingArea) throws EntityNotFoundException {
    return parkingAreaRepository.save(parkingArea);
  }

  @Override
  public boolean deleteParkingArea(String name) {
    // Handle conflicts - multiple areas with same name?
    return parkingAreaRepository.findById(parkingAreaRepository.deleteByName(name)) != null;
  }
}
