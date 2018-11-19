package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Employee;
import se.lnu.ParkingZpot.repositories.EmployeeRepository;

import java.util.List;

@Component
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  @Override
  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  @Override
  public Employee registerEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }
}
