package se.lnu.ParkingZpot.controllers.powner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.prepost.PreAuthorize;
import se.lnu.ParkingZpot.authentication.CurrentUser;
import se.lnu.ParkingZpot.authentication.UserDetailsImpl;

import se.lnu.ParkingZpot.authentication.JwtTokenProvider;
import se.lnu.ParkingZpot.exceptions.EntityExistsException;
import se.lnu.ParkingZpot.models.ParkingArea;
import se.lnu.ParkingZpot.models.Rate;
import se.lnu.ParkingZpot.payloads.UpdateParkingAreaRequest;
import se.lnu.ParkingZpot.services.ParkingAreaService;
import se.lnu.ParkingZpot.payloads.AddParkingAreaRequest;
import se.lnu.ParkingZpot.payloads.ApiResponse;
import se.lnu.ParkingZpot.payloads.Messages;

import java.util.List;
import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping({"/api/parkingarea"})
public class ParkingAreaController {

  private final JwtTokenProvider tokenProvider;
  private final ParkingAreaService parkingAreaService;

  @Autowired
  public ParkingAreaController(ParkingAreaService parkingAreaService, JwtTokenProvider tokenProvider) {
    this.parkingAreaService = parkingAreaService;
    this.tokenProvider = tokenProvider;
  }

  @GetMapping
  public ResponseEntity<List<ParkingArea>> getAllParkingAreas() {
    return new ResponseEntity<>(parkingAreaService.getAllParkingAreas(), HttpStatus.OK);
  }

  @GetMapping("/owned")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<List<ParkingArea>> getAllParkingAreasBelongingToUser(@CurrentUser UserDetailsImpl principal) {
    return new ResponseEntity<>(parkingAreaService.getAllParkingAreasBelongingToUser(principal.getId()), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> addParkingArea(@CurrentUser UserDetailsImpl principal, @Valid @RequestBody AddParkingAreaRequest addParkingAreaRequest) {
    Long id = ( addParkingAreaRequest.getId() != null && addParkingAreaRequest.getId().isPresent()) ? Long.parseLong(addParkingAreaRequest.getId().get()) : principal.getId();
    double[] coords = addParkingAreaRequest.getCoords();
    String name = addParkingAreaRequest.getName();

    try {
      parkingAreaService.addParkingArea(id, name, coords);
    } catch (EntityExistsException e) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    URI parkingAreaLocation = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/api/parkingarea/{name}")
      .buildAndExpand(name).toUri();

    return ResponseEntity.created(parkingAreaLocation).body(new ApiResponse(true, Messages.addSuccess(Messages.PArea)));
  }

  @DeleteMapping("/{area_id}")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> deleteParkingArea(@CurrentUser UserDetailsImpl principal, @PathVariable("area_id") String areaId) {
    //TODO: Check that no cars are parked in the area

    Optional<ParkingArea> parkingArea = parkingAreaService.getParkingArea(Long.parseLong(areaId));

    if (!parkingArea.isPresent()) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PArea)), HttpStatus.OK);
    }

    if (parkingArea.get().getUserId() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    if (parkingAreaService.deleteParkingArea(parkingArea.get().getName())) {
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, Messages.entityDeleted(Messages.PArea)), HttpStatus.OK);
    }

    return new ResponseEntity<ApiResponse>(new ApiResponse(false, Messages.UNAUTH_CRUD), HttpStatus.UNAUTHORIZED);
  }

  @PutMapping("/{area_id}")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> updateParkingArea(@CurrentUser UserDetailsImpl principal,
                                                       @Valid @RequestBody UpdateParkingAreaRequest updateParkingAreaRequest,
                                                       @PathVariable("area_id") String areaId) {

    Optional<ParkingArea> parkingArea = parkingAreaService.getParkingArea(Long.parseLong(areaId));

    if (!parkingArea.isPresent()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.entityNotFound(updateParkingAreaRequest.getName())), HttpStatus.BAD_REQUEST);
    }

    if (parkingArea.get().getUserId() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    parkingArea.get().setName(updateParkingAreaRequest.getName());
    parkingArea.get().setCoords(updateParkingAreaRequest.getCoords());
    parkingAreaService.updateParkingArea(parkingArea.get());

    return new ResponseEntity<>(new ApiResponse(true, Messages.updateSuccess(updateParkingAreaRequest.getName())), HttpStatus.OK);
  }

  @PutMapping("/rates/{area_id}")
  @PreAuthorize("hasAnyRole('PARKING_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse> updateParkingAreaRates(@CurrentUser UserDetailsImpl principal,
                                                       @Valid @RequestBody Rate[] rates,
                                                       @PathVariable("area_id") String areaID) {
    
    Optional<ParkingArea> parkingArea = parkingAreaService.getParkingArea(Long.parseLong(areaID));

    if (!parkingArea.isPresent()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.entityNotFound(Messages.PArea)), HttpStatus.BAD_REQUEST);
    }

    if (parkingArea.get().getUserId() != principal.getId()) {
      return new ResponseEntity<>(new ApiResponse(false, Messages.ACCESS_DENIED), HttpStatus.FORBIDDEN);
    }

    for (int i = 0; i < rates.length; i++) {
      parkingArea.get().getRates().add(rates[i]);
    }

    parkingAreaService.updateParkingArea(parkingArea.get());
    return new ResponseEntity<>(new ApiResponse(true, Messages.updateSuccess(Messages.PArea)), HttpStatus.OK);
  }
}
