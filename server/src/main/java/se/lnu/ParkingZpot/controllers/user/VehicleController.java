package se.lnu.ParkingZpot.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.services.VehicleService;
import se.lnu.ParkingZpot.payloads.AddVehicleRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

  private final JwtTokenProvider tokenProvider;
  private final VehicleService vehicleService;

  @Autowired
  public VehicleController(VehicleService vehicleService, JwtTokenProvider tokenProvider) {
    this.vehicleService = vehicleService;
    this.tokenProvider = tokenProvider;
  }

  @GetMapping
  public ResponseEntity<List<Vehicle>> getAllVehicles() {
    return new ResponseEntity<>(vehicleService.getAllVehicles(), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<ApiResponse> addVehicle(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody AddVehicleRequest addVehicleRequest) {
    Long id = addVehicleRequest.getId().isPresent() ? Long.parseLong(addVehicleRequest.getId().get()) : principal.getId();
    String registrationNumber = addVehicleRequest.getRegistrationNumber();
    
    try {
      vehicleService.addVehicle(id, registrationNumber);
    } catch (EntityExistsException e) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    URI vehicleLocation = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/api/vehicles/{registrationNumber}")
      .buildAndExpand(registrationNumber).toUri();

    return ResponseEntity.created(vehicleLocation).body(new ApiResponse(true, Messages.addSuccess(Messages.VEHICLE)));
  }
}
