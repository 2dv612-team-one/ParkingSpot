package se.lnu.ParkingZpot.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import se.lnu.ParkingZpot.models.Message;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @SubscribeMapping("/message")
    public String subscribeInit() {
        // TODO: Add some method here to retrieve missed message(s)
        return "Välkommen";
    }

}