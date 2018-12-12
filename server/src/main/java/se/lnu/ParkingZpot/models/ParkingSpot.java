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

  @Column(name = "user_Id", nullable = false)
  private long userId;
  private String name;
  private double coord1;
  private double coord2;
  private double coord3;
  private double coord4;

  
  public void setCoords(double[] coords){
    this.coord1 = coords[0];
    this.coord2 = coords[1];
    this.coord3 = coords[2];
    this.coord4 = coords[3];
  }

  public ParkingSpot(long user_Id, String name, double[] coords) {
    super();
    this.userId = user_Id;
    this.name = name;
    this.coord1 = coords[0];
    this.coord2 = coords[1];
    this.coord3 = coords[2];
    this.coord4 = coords[3];
  }
}
