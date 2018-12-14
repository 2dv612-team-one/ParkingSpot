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
	private long rate_id;

  private String rate_from;
  private String rate_to;

  private Double rate;

  public Rate(String rate_from, String rate_to, Double rate) {
    this.rate_from = rate_from;
    this.rate_to = rate_to;
    this.rate = rate;
  }
}
