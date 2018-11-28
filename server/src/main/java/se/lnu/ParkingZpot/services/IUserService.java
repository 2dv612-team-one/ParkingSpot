package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.VerificationToken;
import java.util.Optional;

@Service
public interface IUserService {
  User registerNewUserAccount(String username, String email, String password, String role);
  User getUser(String verificationToken);
  Optional<User> getUser(long id);
  VerificationToken getVerificationToken(String verificationToken);
  void saveRegisteredUser(User user);
  void createVerificationToken(User user, String token);
  void deleteVerificationToken(VerificationToken token);
}