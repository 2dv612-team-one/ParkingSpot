package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.ParkingSpot;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
  Optional<ParkingSpot> findById(@Param("id") long id);
  Boolean existsByName(String name);
  ParkingSpot findByName(String name);
  @Transactional
  Long deleteByName(String name);
}
