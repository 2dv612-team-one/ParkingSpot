package se.lnu.ParkingZpot.services;

import org.springframework.stereotype.Service;
import se.lnu.ParkingZpot.models.Employee;

import java.util.List;

@Service
public interface EmployeeService {
  List<Employee> getAllEmployees();
  Employee registerEmployee(Employee employee);
}
