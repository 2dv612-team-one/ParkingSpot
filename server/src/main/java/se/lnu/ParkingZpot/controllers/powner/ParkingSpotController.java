package se.lnu.ParkingZpot.controllers.powner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.annotation.Secured;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.ParkingSpot;
import se.lnu.ParkingZpot.services.ParkingSpotService;
import se.lnu.ParkingZpot.payloads.AddParkingSpotRequest;
import se.lnu.ParkingZpot.payloads.DeleteParkingSpotRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import javax.validation.Valid;
import java.net.URI;

@Secured({"ROLE_PARKING_OWNER"})
@RestController
@RequestMapping("/api/parkingspots")
public class ParkingSpotController {

  private final JwtTokenProvider tokenProvider;
  private final ParkingSpotService parkingSpotService;

  @Autowired
  public ParkingSpotController(ParkingSpotService parkingSpotService, JwtTokenProvider tokenProvider) {
    this.parkingSpotService = parkingSpotService;
    this.tokenProvider = tokenProvider;
  }

  @GetMapping
  public ResponseEntity<List<ParkingSpot>> getAllParkingSpots() {
    return new ResponseEntity<>(parkingSpotService.getAllParkingSpots(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<ApiResponse> addParkingSpot(@Valid @RequestBody AddParkingSpotRequest addParkingSpotRequest) {
    Long id = tokenProvider.getUserIdFromJWT(addParkingSpotRequest.accessToken);
    int[] coords = addParkingSpotRequest.getCoords();
    String name = id + "-" + addParkingSpotRequest.getName();
    
    try {
      parkingSpotService.addParkingSpot(id, name, coords);
    } catch (EntityExistsException e) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    URI pspotLocation = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/api/parkingspots/{name}")
      .buildAndExpand(name).toUri();

    return ResponseEntity.created(pspotLocation).body(new ApiResponse(true, Messages.addSuccess(Messages.PSPOT)));
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse> deleteParkingSpot(@Valid @RequestBody DeleteParkingSpotRequest deleteParkingSpotRequest) {
    Long id = tokenProvider.getUserIdFromJWT(deleteParkingSpotRequest.getAccessToken());
    ParkingSpot spot = parkingSpotService.getParkingSpot(deleteParkingSpotRequest.getName());
    
    if (!(id == spot.getUser_Id())) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.UNAUTH_CRUD), HttpStatus.UNAUTHORIZED);
    }
    //TODO: Check that no cars are parked in the area
    parkingSpotService.deleteParkingSpot(id + '-' + spot.getName());
    return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PSPOT)), HttpStatus.OK);
  }
}