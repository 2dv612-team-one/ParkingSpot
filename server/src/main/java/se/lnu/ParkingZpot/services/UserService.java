package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.VerificationToken;
import se.lnu.ParkingZpot.repositories.UserRepository;
import se.lnu.ParkingZpot.repositories.VerificationTokenRepository;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import se.lnu.ParkingZpot.repositories.RoleRepository;
import java.util.Collections;
import java.util.Optional;

import java.util.List;

@Component
public class UserService implements IUserService {
    
  @Autowired
  private UserRepository repository;

  @Autowired
  private VerificationTokenRepository tokenRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public User registerNewUserAccount(String username, String email, String password, String role) throws EntityExistsException {

    if (repository.existsByUsername(username)) {
      throw new EntityExistsException("Username already exists");
    }

    if (repository.existsByEmail(email)) {
      throw new EntityExistsException("This email is already in use");
    }

    User user = new User(username, email, password);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    Role userRole = roleRepository.findByName("ROLE_" + role.toUpperCase()).orElseThrow(() -> new ApplicationException("No such role exists"));
    user.setUserRoles(Collections.singleton(userRole));

    return repository.save(user);
  }
    
  @Override
  public User getUser(String verificationToken) {
      User user = tokenRepository.findByToken(verificationToken).getUser();
      return user;
  }

  @Override
  public Optional<User> getUser(long id) {
    return repository.findById(id);
  }
    
  @Override
  public VerificationToken getVerificationToken(String verificationToken) {
      return tokenRepository.findByToken(verificationToken);
  }
    
  @Override
  public void saveRegisteredUser(User user) {
      repository.save(user);
  }
    
  @Override
  public void createVerificationToken(User user, String token) {
      VerificationToken myToken = new VerificationToken(user, token);
      tokenRepository.save(myToken);
  }

  @Override
  public void deleteVerificationToken(VerificationToken token) {
      tokenRepository.delete(token);
  }
}