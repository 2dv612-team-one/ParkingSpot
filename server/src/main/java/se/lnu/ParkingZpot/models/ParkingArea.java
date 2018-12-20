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
  private String wkt;

  @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name="id", nullable=true)
  public List<Rate> rates;

  @OneToMany(fetch = FetchType.LAZY, mappedBy="area", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Parking> involved_in;

  public ParkingArea(long user_Id, String name, String wkt) {
    super();
    this.userId = user_Id;
    this.name = name;
    this.wkt = wkt;
  }

  public List<Rate> getRates() {
    return this.rates;
  }
}
