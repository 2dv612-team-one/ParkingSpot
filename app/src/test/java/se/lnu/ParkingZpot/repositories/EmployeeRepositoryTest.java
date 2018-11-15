package se.lnu.ParkingZpot.repositories;

import se.lnu.ParkingZpot.ParkingZpotApplication;
import se.lnu.ParkingZpot.models.Employee;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParkingZpotApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class EmployeeRepositoryTest {
    private static final String USER_ENDPOINT = "http://localhost:8080/api/employees";

    @Autowired
    private EmployeeRepository userRepo;

    @Before
    public void setUp() {
        if (userRepo.findById(1).isEmpty()) {
            Employee user = new Employee("Adam", "Houston", "Mechanical Systems Engineer");
            user = userRepo.save(user);
        }
    }

    @Test
    public void TestGetUserStatusOkay() {
        final Response res = RestAssured.get(USER_ENDPOINT + "/1");

        assertEquals(200, res.getStatusCode());
        assertTrue(res.asString().contains("description"));
        assertTrue(res.asString().contains("Mechanical Systems Engineer"));
    }

    @Test
    public void TestGetAllUsersStatusOkay() {
        final Response res = RestAssured.get(USER_ENDPOINT);

        assertEquals(200, res.getStatusCode());
        assertTrue(res.asString().contains("description"));
        assertTrue(res.asString().contains("Mechanical Systems Engineer"));
    }
}