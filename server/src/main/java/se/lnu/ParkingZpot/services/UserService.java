package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.VerificationToken;
import se.lnu.ParkingZpot.payloads.ApiResponse;
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

import static se.lnu.ParkingZpot.payloads.Messages.USER_NOT_FOUND;
import static se.lnu.ParkingZpot.payloads.Messages.USER_PASSWORD_UPDATE_FAIL_SAME;

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
      userRoles.add(roleService.findByName(role.getName()).orElseThrow(() -> new ApplicationException(Messages.REG_ERROR_EXISTS_ROLE + role.getName())));
    }

    Role userRole = roleService.findByName("ROLE_USER").orElseThrow(() -> new ApplicationException(Messages.REG_ERROR_EXISTS_ROLE + "ROLE_USER"));
    if (!(userRoles.contains(userRole))) {
     userRoles.add(userRole);
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
  public User updateUser(User user) {
    return repository.save(user);
  }

  @Override
  public Optional<Role> getUserRole(User user) {
    Optional<Role> userRole = roleService.findByName("ROLE_USER");
    Optional<Role> adminRole = roleService.findByName("ROLE_ADMIN");
    Optional<Role> pownerRole = roleService.findByName("ROLE_PARKING_OWNER");

    if (userRole.isPresent() && adminRole.isPresent() && pownerRole.isPresent()) {
      if (user.getUserRoles().contains(adminRole.get())) {
        return adminRole;
      } else if (user.getUserRoles().size() > 1) {
          for (Role role : user.getUserRoles()) {
            if (!(role.getName().equals(userRole.get().getName()))) {
              return roleService.findByName(role.getName());
            }
          }
      } else if (user.getUserRoles().contains(userRole.get())){
          return userRole;
      }
    } else {
      // TODO: Exception, roles not initialized
    }

    return Optional.empty();
  }

  @Override
  public boolean changeUserPassword(User user, String newPassword) {
    if (passwordEncoder.matches(newPassword, user.getPassword())) {
      return false;
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    repository.save(user);

    return true;
  }

  @Override
  public boolean changeUserEmail(User user, String newEmail) {
    if (user.getEmail().equals(newEmail)) {
      return false;
    }

    user.setEmail(newEmail);
    user.setEnabled(false);

    repository.save(user);

    return true;
  }

  @Override
  @Transactional
  public boolean deleteUser(UserDetails userPrincipal) {
    Optional<User> user = repository.findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername());

    if (user.isPresent()) {
      tokenRepository.deleteAllByUser(user.get());

      Optional<User> deletedUser = repository.findById(repository.deleteByUsername(userPrincipal.getUsername()));

      return !deletedUser.isPresent();
    }

    return false;
  }
}
