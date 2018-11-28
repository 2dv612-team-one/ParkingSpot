package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.Role;

import java.util.List;
import java.util.Optional;

@Service
public interface IRoleService {
  List<Role> getAllRoles();
  Optional<Role> findByName(String name);
}
