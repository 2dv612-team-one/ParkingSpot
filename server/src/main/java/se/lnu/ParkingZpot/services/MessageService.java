package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import se.lnu.ParkingZpot.models.Message;
import se.lnu.ParkingZpot.repositories.MessageRepository;

@Component
@RepositoryEventHandler(Message.class)
public class MessageService {

    private final MessageRepository repository;
	private final SimpMessagingTemplate websocket;
	private final EntityLinks entityLinks;

	@Autowired
	public MessageService(MessageRepository repository, SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.repository = repository;
		this.websocket = websocket;
		this.entityLinks = entityLinks;
    }
    
    public Message addMessage(String message) {
        // TODO add some kind of message prechecks / exception handling
        Message msg = new Message(message);
        this.websocket.convertAndSend("/topic/message", message);
        return repository.save(msg);
    }

}