package se.lnu.ParkingZpot.config;

import java.security.Principal;
import java.util.Map;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;

@Configuration
@EnableWebSocketMessageBroker
@Controller
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  private final JwtTokenProvider tokenProvider;

  @Autowired
  public WebSocketConfig(JwtTokenProvider tokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/topic");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")
      .setAllowedOrigins("*")
      .withSockJS();
  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(new TopicSubscriptionInterceptor(this.tokenProvider));
  }

}

class TopicSubscriptionInterceptor extends ChannelInterceptorAdapter {
  private static final Logger logger = LoggerFactory.getLogger(TopicSubscriptionInterceptor.class);

  private final JwtTokenProvider tokenProvider;

  @Autowired
  public TopicSubscriptionInterceptor(JwtTokenProvider tokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
    String type = headerAccessor.getHeader("stompCommand").toString();

    if (type != "DISCONNECT") {
      List<String> authHeaders = headerAccessor.getNativeHeader("Authorization");
      boolean validToken = false;

      if (authHeaders != null) {
        validToken = tokenProvider.validateToken(authHeaders.get(0));
      }

      if (!validToken) {
        throw new IllegalArgumentException("No permission for this topic");
      }
    }

    return message;
  }
}
