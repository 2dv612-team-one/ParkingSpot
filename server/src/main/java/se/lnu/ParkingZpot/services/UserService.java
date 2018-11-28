package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.User;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
  Optional<User> findByEmail(String email);
  Optional<User> findByUsernameOrEmail(String username, String email);
  List<User> findByIdIn(List<Long> userIds);
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);
  User saveUser(User user);
}
