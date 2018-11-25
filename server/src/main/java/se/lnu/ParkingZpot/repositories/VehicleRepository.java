package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.Vehicle;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
  List<Vehicle> findById(@Param("id") long id);
  Boolean existsByRegistrationNumber(String registrationNumber);
}
