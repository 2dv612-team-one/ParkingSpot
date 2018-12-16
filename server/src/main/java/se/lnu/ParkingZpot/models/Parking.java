package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "parkings")
public class Parking {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  public Vehicle vehicle_Id;

  @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  public ParkingArea area_Id;

  public Parking(long vehicle_Id, long area_Id) {
    super();
    this.vehicle_Id = vehicle_Id;
    this.area_Id = area_Id;
  }
}
