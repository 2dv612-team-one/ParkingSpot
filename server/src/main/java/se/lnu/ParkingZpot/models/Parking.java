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

  private long user_Id;

  @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  private Vehicle vehicle_Id;

  @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  private ParkingArea area_Id;

  public Parking(Vehicle vehicle, ParkingArea area, long user_Id) {
    super();
    this.vehicle = vehicle;
    this.area = area;
    this.user_Id = user_Id;
  }
}
