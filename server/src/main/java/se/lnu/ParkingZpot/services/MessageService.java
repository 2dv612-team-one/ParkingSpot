package se.lnu.ParkingZpot.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import se.lnu.ParkingZpot.models.Message;
import se.lnu.ParkingZpot.models.User;
import se.lnu.ParkingZpot.repositories.MessageRepository;

@Component
@RepositoryEventHandler(Message.class)
public class MessageService implements IMessageService {

  private final MessageRepository repository;
	private final SimpMessagingTemplate websocket;
	private final EntityLinks entityLinks;

	@Autowired
	public MessageService(MessageRepository repository, SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.repository = repository;
		this.websocket = websocket;
		this.entityLinks = entityLinks;
    }

    @Override
    public Message addMessage(String message) {
        Message msg = new Message(message);
        Message savedMessage = repository.save(msg);
        this.websocket.convertAndSend("/topic/message", savedMessage);
        return savedMessage;
    }

    @Override
    public Message updateMessage(Message message) {
        return repository.save(message);
      }

    @Override
    public Optional<Message> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Message> getAllUnseenMessages(Long userId) {
	    List<Message> messages = repository.findAll();
	    List<Message> unseenMessages = new ArrayList<>();

	    for (Message message : messages) {
	      if (!message.getBlacklist().contains(userId)) {
	        unseenMessages.add(message);
        }
      }

      return unseenMessages;
    }

}
