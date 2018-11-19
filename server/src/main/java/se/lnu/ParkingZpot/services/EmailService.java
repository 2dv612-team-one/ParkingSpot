package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;

@Service
public interface EmailService {
  void sendWelcomeEmail() throws UnsupportedEncodingException;
}
