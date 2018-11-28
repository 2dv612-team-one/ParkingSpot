package se.lnu.ParkingZpot.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Value;

import it.ozimov.springboot.mail.model.Email;
import se.lnu.ParkingZpot.models.User;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import javax.mail.internet.InternetAddress;

import com.google.common.collect.Lists;
import java.io.UnsupportedEncodingException;

import java.util.UUID;
import java.net.URI;

@Component
public class EmailService implements IEmailService {

  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

  @Autowired
  it.ozimov.springboot.mail.service.EmailService emailService;

  @Autowired
  UserService userService;

  @Value("${spring.mail.username}") String fromEmail;

  @Override
  public void sendVerificationEmail(User user, URI baseURL) throws UnsupportedEncodingException {
    String token = UUID.randomUUID().toString();
    userService.createVerificationToken(user, token);
        
    String recipientAddress = user.getEmail();
    String recipientName = user.getUsername();
    String subject = "Welcome to the Parking Zpot application! Please verify your email address.";
    String confirmationUrl = baseURL.resolve("?token=" + token).toString();
    String message = "Welcome to the Parking Zpot application. Please confirm your email address by following the provided link: " + confirmationUrl;

    sendMail(recipientAddress, recipientName, subject, message);
  }

  @Override
  public void sendEmailTo(User user, String subject, String message) throws UnsupportedEncodingException {
    String recipientAddress = user.getEmail();
    String recipientName = user.getUsername();
    sendMail(recipientAddress, recipientName, subject, message);
  }
 
  private void sendMail(String address, String name, String subject, String message) throws UnsupportedEncodingException {
    final Email email = DefaultEmail.builder() 
        .from(new InternetAddress(fromEmail, "Parking Zpots"))
        .to(Lists.newArrayList(new InternetAddress(address, name)))
        .subject(subject)
        .body(message)
        .encoding("UTF-8").build();

    logger.error("sending mail");
    
    emailService.send(email); 
  }
}
