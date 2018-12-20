package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "parkings")
public class Parking { 

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vehicle_id", nullable = true)
  @JsonBackReference
  private Vehicle vehicle;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "area_id", nullable = true)
  @JsonBackReference
  private ParkingArea area;

  private long user_id;

  public Parking(long user_Id, Vehicle vehicle, ParkingArea area) {
    this.user_id = user_Id;
    this.vehicle = vehicle;
    this.area = area;
  }
}
