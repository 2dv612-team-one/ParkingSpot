package se.lnu.ParkingZpot.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rates")
public class Rate {

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

  @ManyToOne(fetch=FetchType.LAZY)
	private ParkingArea area;

  private String from_date_format;
  private String to_date_format;

  private Double rate;

  public Rate(String from_date_format, String to_date_format, Double rate) {
    this.from_date_format = from_date_format;
    this.to_date_format = to_date_format;
    this.rate = rate;
  }
}
