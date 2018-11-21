package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Value;

import it.ozimov.springboot.mail.model.Email;
import se.lnu.ParkingZpot.models.User;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import javax.mail.internet.InternetAddress;

import com.google.common.collect.Lists;
import java.io.UnsupportedEncodingException;

@Component
public class EmailServiceImpl implements EmailService {

  @Autowired
  it.ozimov.springboot.mail.service.EmailService emailService;

  @Value("${spring.mail.username}") String fromEmail; 
  @Override
  public void sendWelcomeEmail(User user) throws UnsupportedEncodingException {
    final Email email = DefaultEmail.builder() 
    .from(new InternetAddress(fromEmail, "Parking Zpots"))
    .to(Lists.newArrayList(new InternetAddress(
      user.getEmail(), user.getUsername()))) 
    .subject("Welcome to the Parking Zpot application!")
    .body("Welcome welcome.")
    .encoding("UTF-8").build();
    
    emailService.send(email); 
  }
}
