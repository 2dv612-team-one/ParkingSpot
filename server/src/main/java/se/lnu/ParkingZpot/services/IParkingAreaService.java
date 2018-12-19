package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.ParkingArea;
import java.util.Optional;

import java.util.List;

@Service
public interface IParkingAreaService {
  List<ParkingArea> getAllParkingAreas();
  List<ParkingArea> getAllParkingAreasBelongingToUser(Long userId);
  Optional<ParkingArea> getParkingArea(long id);
  ParkingArea getParkingArea(String name);
  ParkingArea addParkingArea(long userId, String name, String wkt);
  ParkingArea updateParkingArea(ParkingArea parkingArea);
  boolean deleteParkingArea(String name);
}
