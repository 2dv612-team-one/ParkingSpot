package se.lnu.ParkingZpot;

import com.google.common.collect.Sets;
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

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
    Role pownerRole = roleRepository.findByName("ROLE_PARKING_OWNER").orElseThrow(() -> new ApplicationException("No parking owner role exists"));


    if (!userRepository.existsByUsername("User")) {

      User user = new User("User", "User@User.com", "123");

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setUserRoles(Collections.singleton(userRole));
      user.setEnabled(true);

      userRepository.save(user);
    }

    if (!userRepository.existsByUsername("Admin")) {

      User user2 = new User("Admin", "Admin@Admin.com", "123");

      user2.setPassword(passwordEncoder.encode(user2.getPassword()));
      user2.setUserRoles(Sets.newHashSet(adminRole, userRole));
      user2.setEnabled(true);

      userRepository.save(user2);
    }

    if (!userRepository.existsByUsername("Powner")) {

      User user = new User("Powner", "Powner@Powner.com", "123");

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setUserRoles(Sets.newHashSet(userRole, pownerRole));
      user.setEnabled(true);

      userRepository.save(user);
    }
  }


  private void loadRoles() {
    if (!roleRepository.existsByName("ROLE_USER")) {
      roleRepository.save(new Role("ROLE_USER"));
    }
    if (!roleRepository.existsByName("ROLE_ADMIN")) {
      roleRepository.save(new Role("ROLE_ADMIN"));
    }
    if (!roleRepository.existsByName("ROLE_PARKING_OWNER")) {
      roleRepository.save(new Role("ROLE_PARKING_OWNER"));
    }
  }
}
