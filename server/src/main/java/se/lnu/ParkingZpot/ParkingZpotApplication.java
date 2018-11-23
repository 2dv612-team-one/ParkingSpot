package se.lnu.ParkingZpot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import it.ozimov.springboot.mail.configuration.EnableEmailTools;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.repositories.RoleRepository;
import se.lnu.ParkingZpot.repositories.UserRepository;

import java.util.Collections;
import java.util.HashSet;

@EnableEmailTools
@SpringBootApplication
public class ParkingZpotApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParkingZpotApplication.class, args);
	}
}

@Component
class DataLoader {

  private final RoleRepository roleRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public DataLoader(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;

    loadRoles();
    saveUser();
  }

  private void saveUser() {

    Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new ApplicationException("No user role exists"));
    Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow(() -> new ApplicationException("No admin role exists"));


    if (!userRepository.existsByUsername("Admin")) {

      User user = new User("Admin", "Admin@Admin.com", "123");

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setUserRoles(Collections.singleton(userRole));

      userRepository.save(user);
    }

    if (!userRepository.existsByUsername("User")) {

      User user2 = new User("User", "User@User.com", "123");

      user2.setPassword(passwordEncoder.encode(user2.getPassword()));
      HashSet<Role> roleSet = new HashSet<Role>();
      roleSet.add(userRole);
      roleSet.add(adminRole);
      user2.setUserRoles(roleSet);

      userRepository.save(user2);
    }
  }


  private void loadRoles() {
    if (!roleRepository.existsByName("ROLE_USER")) {
      roleRepository.save(new Role("ROLE_USER"));
    }
    if (!roleRepository.existsByName("ROLE_ADMIN")) {
      roleRepository.save(new Role("ROLE_ADMIN"));
    }
  }
}
