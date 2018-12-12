package se.lnu.ParkingZpot.services;

import se.lnu.ParkingZpot.models.Message;

import java.util.List;
import java.util.Optional;

public interface IMessageService {
  Message addMessage(String message);

  Message updateMessage(Message message);

  Optional<Message> findById(Long id);

  List<Message> getAllUnseenMessages(Long userId);
}
