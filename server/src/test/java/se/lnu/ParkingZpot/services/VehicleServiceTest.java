package se.lnu.ParkingZpot.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import se.lnu.ParkingZpot.models.Vehicle;

import java.io.UnsupportedEncodingException;


@RunWith(SpringRunner.class)
@SpringBootTest
public class VehicleServiceTest {

    @Autowired
    VehicleServiceImpl vehicleService;

    @Test 
    public void testGetAllVehicles() {
        vehicleService.getAllVehicles();
    }

    @Test 
    public void testAddVehicle() {
        long user_id = 123;
        String regNum = "123ABC";
        Vehicle vehicle = new Vehicle(user_id, regNum);
        vehicleService.addVehicles(vehicle);
    }
}