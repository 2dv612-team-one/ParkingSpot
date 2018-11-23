package se.lnu.ParkingZpot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.services.VehicleService;
import se.lnu.ParkingZpot.repositories.VehicleRepository;
import se.lnu.ParkingZpot.payloads.AddVehicleRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;

import java.lang.reflect.Method;
import java.util.List;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private VehicleRepository vehicleRepository;

  private final VehicleService vehicleService;

  @Autowired
  public VehicleController(VehicleService vehicleService) {
    this.vehicleService = vehicleService;
  }

  @GetMapping
  public ResponseEntity<List<Vehicle>> getAllVehicles() {
    return new ResponseEntity<>(vehicleService.getAllVehicles(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity addVehicles(@Valid @RequestBody AddVehicleRequest addVehicleRequest) {
    Long id = tokenProvider.getUserIdFromJWT(addVehicleRequest.accessToken);
    String registrationNumber = addVehicleRequest.getRegistrationNumber();

    if (vehicleRepository.existsByRegistrationNumber(registrationNumber)) {
      return new ResponseEntity(new ApiResponse(false, "This vehicle already exists"), HttpStatus.BAD_REQUEST);
    }

    Vehicle vehicle = new Vehicle(id, registrationNumber);
    vehicleService.addVehicles(vehicle);

    URI vehicleLocation = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/api/vehicles/{registrationNumber}")
      .buildAndExpand(registrationNumber).toUri();

    return ResponseEntity.created(vehicleLocation).body(new ApiResponse(true, "Vehicle successfully added"));
  }
}
