package se.lnu.ParkingZpot.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.AfterClass;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import se.lnu.ParkingZpot.models.Vehicle;
import se.lnu.ParkingZpot.repositories.VehicleRepository;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VehicleServiceTest {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private VehicleRepository vehicleRepository;

    private String firstReg = "666ABC";
    private String secondReg = "123ABC";
    private Long user_id = (long)123;

    @Test 
    public void testGetAllVehicles() {
        int startCount = vehicleService.getAllVehicles().size();

        vehicleService.addVehicles(user_id, firstReg);
        assertTrue(vehicleService.getAllVehicles().size() == (startCount + 1));

        vehicleRepository.deleteByRegistrationNumber(firstReg);
    }

    @Test 
    public void testAddVehicle() {
        vehicleService.addVehicles(user_id, secondReg);

        List<Vehicle> result = vehicleService.getAllVehicles()
                      .stream()
                      .filter(item -> item.getRegistrationNumber().equals(secondReg))
                      .collect(Collectors.toList());

        assertTrue(result.size() > 0);

        vehicleRepository.deleteByRegistrationNumber(secondReg);
    }
}