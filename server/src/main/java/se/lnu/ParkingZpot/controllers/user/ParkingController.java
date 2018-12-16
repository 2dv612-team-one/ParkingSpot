package se.lnu.ParkingZpot.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.BadRequestException;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.Parking;
import se.lnu.ParkingZpot.services.ParkingService;
import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.services.VehicleService;
import se.lnu.ParkingZpot.models.ParkingArea;
import se.lnu.ParkingZpot.services.ParkingAreaService;
import se.lnu.ParkingZpot.payloads.AddParkingRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/parkings")
public class ParkingController {

  private static final Logger logger = LoggerFactory.getLogger(ParkingController.class);

  private final JwtTokenProvider tokenProvider;
  private final ParkingService parkingService;
  private final ParkingAreaService parkingAreaService;
  private final VehicleService vehicleService;

  @Autowired
  public ParkingController(ParkingService parkingService, ParkingAreaService parkingAreaService, VehicleService vehicleService, JwtTokenProvider tokenProvider) {
    this.parkingService = parkingService;
    this.parkingAreaService = parkingAreaService;
    this.vehicleService = vehicleService;
    this.tokenProvider = tokenProvider;
  }

  @GetMapping
  public ResponseEntity<List<Parking>> getAllParkings() {
    return new ResponseEntity<List<Parking>>(parkingService.getAllParkings(), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<ApiResponse> addParking(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody AddParkingRequest addParkingRequest) {
    Long user_id = (addParkingRequest.getId() != null && addParkingRequest.getId().isPresent()) ? Long.parseLong(addParkingRequest.getId().get()) : principal.getId();
    String regNum = addParkingRequest.getRegistrationNumber();
    String area_id = addParkingRequest.getAreaID();

    Optional<ParkingArea> parkingArea = parkingAreaService.getParkingArea(area_id);
    Optional<Vehicle> vehicle = vehicleService.getVehicle(regNum);

    if (vehicle.isPresent() && vehicle.get().getUser_Id() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    if (!vehicle.isPresent() || !parkingArea.isPresent()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.entityNotFound(Messages.VEHICLE + " or " + Messages.PArea)), HttpStatus.BAD_REQUEST);
    }

    try {
      Parking parking = parkingService.addParking(parkingArea, vehicle, user_id);
      long parking_id = parking.getId();

      URI parkingLocation = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/api/parkings/{parking_id}")
      .buildAndExpand(parking_id).toUri();

      return ResponseEntity.created(parkingLocation).body(new ApiResponse(true, Messages.addSuccess(Messages.PARKING)));
    } catch (BadRequestException e) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.CANNOT_MODIFY), HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping("/{park_id}")
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<ApiResponse> deleteParking(@CurrentUser UserDetailsImpl principal, @PathVariable("park_id") String parkID) {
    
    Optional<Parking> parking = parkingService.getParking(parkID);

    if (!parking.isPresent()) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.VEHICLE)), HttpStatus.OK);
    }

    if (parking.get().getUser_Id() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    if (parkingService.deleteParking(parkID)) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PARKING)), HttpStatus.OK);
    }

    return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.UNAUTH_CRUD), HttpStatus.UNAUTHORIZED);
  }
}
