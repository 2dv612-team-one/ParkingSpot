package se.lnu.ParkingZpot.repositories;

import se.lnu.ParkingZpot.ParkingZpotApplication;
import se.lnu.ParkingZpot.models.Employee;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Value;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParkingZpotApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EmployeeRepositoryTest {
    private String USER_ENDPOINT;

    @Autowired
    private EmployeeRepository userRepo;

    @Value("${local.server.port}" )int runningPort;
    @Before
    public void setUp() {
        if (userRepo.findById(1).isEmpty()) {
            Employee user = new Employee("Adam", "Houston", "Mechanical Systems Engineer");
            user = userRepo.save(user);
        }

        USER_ENDPOINT = "http://localhost:" + runningPort + "/api/employees";
    }

    @Test
    public void TestGetUserStatusOkay() {
        final Response res = RestAssured.get(USER_ENDPOINT + "/1");

        assertEquals(200, res.getStatusCode());
        assertTrue(res.asString().contains("description"));
        assertTrue(res.asString().contains("Research Assistant III"));
    }

    @Test
    public void TestGetAllUsersStatusOkay() {
        final Response res = RestAssured.get(USER_ENDPOINT);

        assertEquals(200, res.getStatusCode());
        assertTrue(res.asString().contains("employees"));
        assertTrue(res.asString().contains("Shaw"));
        assertTrue(res.asString().contains("Bishop"));
    }
}