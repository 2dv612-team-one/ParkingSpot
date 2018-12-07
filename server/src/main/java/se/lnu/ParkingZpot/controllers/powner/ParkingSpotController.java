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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import org.springframework.security.access.prepost.PreAuthorize;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.ParkingSpot;
import se.lnu.ParkingZpot.services.ParkingSpotService;
import se.lnu.ParkingZpot.payloads.AddParkingSpotRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import javax.validation.Valid;
import java.net.URI;

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
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> addParkingSpot(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody AddParkingSpotRequest addParkingSpotRequest) {
    Long id = ( addParkingSpotRequest.getId() != null && addParkingSpotRequest.getId().isPresent()) ? Long.parseLong(addParkingSpotRequest.getId().get()) : principal.getId();
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

  @DeleteMapping("/{spot_name}")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> deleteParkingSpot(@CurrentUser UserDetailsImpl principal, @PathVariable("spot_name") String spotName) {
    //TODO: Check that no cars are parked in the area
    String spot = (principal.getId() + "-" + spotName);

    if (parkingSpotService.deleteParkingSpot(spot)) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PSPOT)), HttpStatus.OK);
    }

    return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.UNAUTH_CRUD), HttpStatus.UNAUTHORIZED);
  }
}