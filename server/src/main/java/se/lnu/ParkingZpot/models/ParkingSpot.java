package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "parking_spots")
public class ParkingSpot {
    
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long user_Id;
  private String name;
  private int coords;

  public Vehicle(long user_Id, String name, int[] coords) {
    super();
    this.user_Id = user_Id;
    this.name = name;
    this.coords = coords;
  }
}