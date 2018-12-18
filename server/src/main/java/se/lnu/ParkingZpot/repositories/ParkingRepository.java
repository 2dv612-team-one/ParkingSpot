package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.Parking;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface ParkingRepository extends JpaRepository<Parking, Long> {
  List<Parking> findAll();
  Optional<Parking> findById(@Param("id") long id);
  
  @Transactional
  Long deleteById(long id);
}
