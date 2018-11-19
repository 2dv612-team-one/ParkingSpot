package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.User;
import java.io.UnsupportedEncodingException;

@Service
public interface EmailService {
  void sendWelcomeEmail(User user) throws UnsupportedEncodingException;
}
