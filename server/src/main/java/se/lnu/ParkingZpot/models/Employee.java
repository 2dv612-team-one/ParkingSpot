package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String forename;
  private String surname;
  private String description;

  public Employee(String forename, String surname, String description) {
    super();
    this.forename = forename;
    this.surname = surname;
    this.description = description;
  }

}
