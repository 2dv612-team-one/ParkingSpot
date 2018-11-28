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
import se.lnu.ParkingZpot.payloads.Messages;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Optional;

@Component
public class UserService implements IUserService {

  private final UserRepository repository;
  private final VerificationTokenRepository tokenRepository;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository repository, VerificationTokenRepository tokenRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
    this.repository = repository;
    this.tokenRepository = tokenRepository;
    this.roleService = roleService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public User registerNewUserAccount(String username, String email, String password, Set<Role> roles) throws EntityExistsException {

    if (repository.existsByUsername(username)) {
      throw new EntityExistsException(Messages.REG_ERROR_USERNAME);
    }

    if (repository.existsByEmail(email)) {
      throw new EntityExistsException(Messages.REG_ERROR_EMAIL);
    }

    User user = new User(username, email, password);
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Set<Role> userRoles = new HashSet<Role>();

    for (Role role : roles) {
      userRoles.add(roleService.findByName(role.getName()).orElseThrow(() -> new ApplicationException(Messages.REG_ERROR_ROLE + role.getName())));
    }

    user.setUserRoles(userRoles);

    return repository.save(user);
  }

  @Override
  public User registerNewUserAccount(String username, String email, String password, String role) throws EntityExistsException {
    Set<Role> userRole = Collections.singleton(new Role("ROLE_" + role.toUpperCase()));
    return registerNewUserAccount(username, email, password, userRole);
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
  public void createVerificationToken(User user, String token) {
      VerificationToken myToken = new VerificationToken(user, token);
      tokenRepository.save(myToken);
  }

  @Override
  public void deleteVerificationToken(VerificationToken token) {
      tokenRepository.delete(token);
  }

  @Override
  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }

  @Override
  public Optional<User> findByUsernameOrEmail(String username, String email) {
    return repository.findByUsernameOrEmail(username, email);
  }

  @Override
  public List<User> findByIdIn(List<Long> userIds) {
    return repository.findByIdIn(userIds);
  }

  @Override
  public Optional<User> findByUsername(String username) {
    return repository.findByUsername(username);
  }

  @Override
  public Boolean existsByUsername(String username) {
    return repository.existsByUsername(username);
  }

  @Override
  public Boolean existsByEmail(String email) {
    return repository.existsByEmail(email);
  }

  @Override
  public User saveUser(User user) {
    return repository.save(user);
  }

  @Override
  public Optional<Role> getUserRole(User user) {
    Optional<Role> userRole = roleService.findByName("ROLE_USER");
    Optional<Role> adminRole = roleService.findByName("ROLE_ADMIN");

    if (userRole.isPresent() && adminRole.isPresent()) {
      if (user.getUserRoles().contains(adminRole.get())) {
        return adminRole;
      } else if (user.getUserRoles().contains(userRole.get())) {
        return userRole;
      }
    } else {
      // TODO: Exception, roles not initialized
    }

    return Optional.empty();
  }
}
