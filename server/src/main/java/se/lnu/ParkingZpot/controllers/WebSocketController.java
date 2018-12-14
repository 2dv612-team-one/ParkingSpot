package se.lnu.ParkingZpot.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import se.lnu.ParkingZpot.services.IMessageService;

@Controller
public class WebSocketController {

    @Autowired
    private IMessageService messageService;

    @SubscribeMapping("/message")
    public void subscribeInit() {
        this.messageService.addMessage("Välkommen!");
    }

}