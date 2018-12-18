package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "parking_areas")
public class ParkingArea {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "user_Id", nullable = false)
  private long userId;

  private String name;
  private double coord1;
  private double coord2;
  private double coord3;
  private double coord4;

  @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  public List<Rate> rates;

  @OneToOne(fetch = FetchType.LAZY, mappedBy="area", cascade = CascadeType.ALL)
  @JsonManagedReference
  private Parking parked_at;

  public void setCoords(double[] coords){
    this.coord1 = coords[0];
    this.coord2 = coords[1];
    this.coord3 = coords[2];
    this.coord4 = coords[3];
  }

  public ParkingArea(long user_Id, String name, double[] coords) {
    super();
    this.userId = user_Id;
    this.name = name;
    this.coord1 = coords[0];
    this.coord2 = coords[1];
    this.coord3 = coords[2];
    this.coord4 = coords[3];
  }

  public List<Rate> getRates() {
    return this.rates;
  }
}
