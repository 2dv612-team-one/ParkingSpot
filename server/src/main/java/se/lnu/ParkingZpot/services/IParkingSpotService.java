package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.ParkingSpot;
import java.util.Optional;

import java.util.List;

@Service
public interface IParkingSpotService {
  List<ParkingSpot> getAllParkingSpots();
  Optional<ParkingSpot> getParkingSpot(long id);
  ParkingSpot getParkingSpot(String name);
  ParkingSpot addParkingSpot(long userId, String name, int[] coords);
  boolean deleteParkingSpot(String name);
}