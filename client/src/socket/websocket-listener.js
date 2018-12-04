import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';

define((require) => {
  return {
    register,
  };

  function register(registrations) {
    const socket = SockJS('/payroll');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      registrations.forEach((registration) => {
        stompClient.subscribe(registration.route, registration.callback);
      });
    });
  }
});
