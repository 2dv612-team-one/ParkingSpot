package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.ParkingSpot;

import java.util.List;

@Service
public interface IParkingSpotService {
  List<ParkingSpot> getAllParkingSpots();
  ParkingSpot addParkingSpots(long userId, String name, int[] coords);
}
