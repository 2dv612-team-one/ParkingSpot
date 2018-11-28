package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.User;
import java.io.UnsupportedEncodingException;
import java.net.URI;

@Service
public interface IEmailService {
  void sendVerificationEmail(User user, URI baseURL) throws UnsupportedEncodingException;
  void sendEmailTo(User user, String subject, String message) throws UnsupportedEncodingException;
}
