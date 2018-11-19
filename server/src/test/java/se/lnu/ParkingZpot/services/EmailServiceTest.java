package se.lnu.ParkingZpot.services;

import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import it.ozimov.springboot.mail.model.Email;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import javax.mail.internet.InternetAddress;
import java.io.UnsupportedEncodingException;

import com.google.common.collect.Lists;


@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceTest {
    @Autowired 
    it.ozimov.springboot.mail.service.EmailService emailService; 

    @Value("${spring.mail.username}") String fromEmail; 
    @Test 
    public void testSendEmail() throws UnsupportedEncodingException { 
        final Email email = DefaultEmail.builder() 
            .from(new InternetAddress(fromEmail, "From Name"))
            .to(Lists.newArrayList(new InternetAddress(
              "parkingzpot@gmail.com", "Parking Zpot"))) 
            .subject("Testing email")
            .body("Testing body ...")
            .encoding("UTF-8").build();
        emailService.send(email); 
    }
}