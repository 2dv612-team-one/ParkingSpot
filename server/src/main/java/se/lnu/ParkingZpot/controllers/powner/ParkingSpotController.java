package se.lnu.ParkingZpot.controllers.powner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;
import org.springframework.security.access.prepost.PreAuthorize;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.Message;
import se.lnu.ParkingZpot.models.ParkingSpot;
import se.lnu.ParkingZpot.payloads.UpdateParkingSpotRequest;
import se.lnu.ParkingZpot.services.ParkingSpotService;
import se.lnu.ParkingZpot.payloads.AddParkingSpotRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

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
    String name = addParkingSpotRequest.getName();

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

    if (parkingSpotService.deleteParkingSpot((spotName))) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PSPOT)), HttpStatus.OK);
    }

    return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.UNAUTH_CRUD), HttpStatus.UNAUTHORIZED);
  }

  @PutMapping("/update")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> updateParkingSpot(@CurrentUser UserDetailsImpl principal,
                                                       @Valid @RequestBody UpdateParkingSpotRequest updateParkingSpotRequest) {

    Optional<ParkingSpot> parkingSpot = parkingSpotService.getParkingSpot(updateParkingSpotRequest.getId());

    if (!parkingSpot.isPresent()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.entityNotFound(updateParkingSpotRequest.getName())), HttpStatus.BAD_REQUEST);
    }

    if (parkingSpot.get().getUser_Id() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    parkingSpot.get().setName(updateParkingSpotRequest.getName());
    parkingSpot.get().setCoords(updateParkingSpotRequest.getCoords());
    parkingSpotService.updateParkingSpot(parkingSpot.get());

    return new ResponseEntity<>(new ApiResponse(true, Messages.updateSuccess(updateParkingSpotRequest.getName())), HttpStatus.OK);
  }
}
