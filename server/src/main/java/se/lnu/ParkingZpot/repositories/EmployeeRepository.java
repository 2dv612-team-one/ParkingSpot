package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lnu.ParkingZpot.models.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "employees", path = "employees")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findById(@Param("id") long id);
}
