package se.lnu.ParkingZpot.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import se.lnu.ParkingZpot.models.User;

import java.io.UnsupportedEncodingException;


@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceTest {

    @Autowired
    EmailServiceImpl emailService;

    @Test 
    public void testSendEmail() throws UnsupportedEncodingException {
        User user = new User("testuser", "password", "parkingzpot@gmail.com");
        emailService.sendWelcomeEmail(user);
    }
}