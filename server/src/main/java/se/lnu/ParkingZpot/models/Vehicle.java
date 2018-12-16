package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long user_Id;
  private String registrationNumber;

  @OneToOne(mappedBy = "vehicle_Id")
  private Parking parked_at;

  public Vehicle(long user_Id, String registrationNumber) {
    super();
    this.user_Id = user_Id;
    this.registrationNumber = registrationNumber;
  }
}
