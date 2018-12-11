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

  @Column(name = "userId", nullable = false)
  private long userId;
  private String name;
  private int[] coords;

  public ParkingSpot(long user_Id, String name, int[] coords) {
    super();
    this.userId = user_Id;
    this.name = name;
    this.coords = coords;
  }
}
