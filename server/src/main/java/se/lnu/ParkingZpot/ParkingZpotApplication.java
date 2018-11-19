package se.lnu.ParkingZpot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import it.ozimov.springboot.mail.configuration.EnableEmailTools;

@EnableEmailTools
@SpringBootApplication
public class ParkingZpotApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParkingZpotApplication.class, args);
	}
}
