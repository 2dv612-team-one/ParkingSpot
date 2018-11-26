package se.lnu.ParkingZpot.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.repositories.UserRepository;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;


@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceTest {

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test 
    public void testSendEmail() throws UnsupportedEncodingException {
        User user = userService.registerNewUserAccount("testuser", "parkingzpot@gmail.com", "password", "user");
        URI basePathLocation = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/auth/confirm").build().toUri();
        emailService.sendVerificationEmail(user, basePathLocation);
        userRepository.deleteByUsername("testuser");
    }
}