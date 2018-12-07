package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.Vehicle;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
  List<Vehicle> findById(@Param("id") long id);
  Optional<Vehicle> getByRegistrationNumber(String registrationNumber);
  Boolean existsByRegistrationNumber(String registrationNumber);
  @Transactional
  Long deleteByRegistrationNumber(String registrationNumber);
}
