package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public Optional<User> findByUsernameOrEmail(String username, String email) {
    return userRepository.findByUsernameOrEmail(username, email);
  }

  @Override
  public List<User> findByIdIn(List<Long> userIds) {
    return userRepository.findByIdIn(userIds);
  }

  @Override
  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public Boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  @Override
  public Boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  @Override
  public User saveUser(User user) {
    return userRepository.save(user);
  }
}
