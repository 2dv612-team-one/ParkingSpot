package se.lnu.ParkingZpot.repositories;

import se.lnu.ParkingZpot.exceptions.ApplicationException;
import se.lnu.ParkingZpot.ParkingZpotApplication;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.models.RoleName;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.repositories.RoleRepository;
import se.lnu.ParkingZpot.repositories.UserRepository;

import io.restassured.RestAssured;
import io.restassured.response.Response;

import java.util.Collections;
import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParkingZpotApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder marie;

    @Value("${local.server.port}" )int runningPort;
    @Before
    public void setUp() {
        saveUser();
    }

    @Test
    public void TestExistsByEmailOkay() {
        boolean result = userRepo.existsByEmail("User@User.com");
        assertTrue(result);
    }

    private void saveUser() {

        Role userRole = roleRepo.findByName(RoleName.ROLE_ADMIN).orElseThrow(() -> new ApplicationException("No admin role exists"));
        Role adminRole = roleRepo.findByName(RoleName.ROLE_USER).orElseThrow(() -> new ApplicationException("No user role exists"));
    
    
        if (!userRepo.existsByUsername("Admin")) {
    
          User user = new User("Admin", "Admin@Admin.com", "123");
    
          user.setPassword(marie.encode(user.getPassword()));
          user.setUserRoles(Collections.singleton(userRole));
    
          userRepo.save(user);
        }
    
        if (!userRepo.existsByUsername("User")) {
    
          User user2 = new User("User", "User@User.com", "123");
    
          user2.setPassword(marie.encode(user2.getPassword()));
          HashSet<Role> roleSet = new HashSet<Role>();
          roleSet.add(userRole);
          roleSet.add(adminRole);
          user2.setUserRoles(roleSet);
    
          userRepo.save(user2);
        }
      }
}