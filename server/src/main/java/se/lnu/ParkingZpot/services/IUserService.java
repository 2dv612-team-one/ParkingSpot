package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.VerificationToken;
import java.util.Optional;
import java.util.List;

@Service
public interface IUserService {
  User registerNewUserAccount(String username, String email, String password, String role);
  User getUser(String verificationToken);
  Optional<User> getUser(long id);
  VerificationToken getVerificationToken(String verificationToken);
  void createVerificationToken(User user, String token);
  void deleteVerificationToken(VerificationToken token);
  Optional<User> findByEmail(String email);
  Optional<User> findByUsernameOrEmail(String username, String email);
  List<User> findByIdIn(List<Long> userIds);
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);
  User saveUser(User user);
}