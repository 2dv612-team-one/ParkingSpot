package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.ParkingArea;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Long> {
  Optional<ParkingArea> findById(@Param("id") long id);

  List<ParkingArea> findAllByUserId(Long userId);

  Boolean existsByName(String name);

  ParkingArea findByName(String name);

  @Transactional
  Long deleteByName(String name);
}

