package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "user_Id", nullable = false)
  private long userId;

  private String registrationNumber;

  @OneToOne(fetch = FetchType.LAZY, mappedBy="vehicle")
  @JsonManagedReference
  private Parking parked_at;

  public Vehicle(long user_Id, String registrationNumber) {
    super();
    this.userId = user_Id;
    this.registrationNumber = registrationNumber;
  }
}
