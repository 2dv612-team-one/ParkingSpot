package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.ParkingSpot;
import java.util.Optional;

import java.util.List;

@Service
public interface IParkingSpotService {
  List<ParkingSpot> getAllParkingSpots();
  List<ParkingSpot> getAllParkingSpotsBelongingToUser(Long userId);
  Optional<ParkingSpot> getParkingSpot(long id);
  ParkingSpot getParkingSpot(String name);
  ParkingSpot addParkingSpot(long userId, String name, int[] coords);
  ParkingSpot updateParkingSpot(ParkingSpot parkingSpot);
  boolean deleteParkingSpot(String name);
}
