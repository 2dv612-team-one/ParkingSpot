package se.lnu.ParkingZpot.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String message;

  @ElementCollection
  @CollectionTable(name="blacklist", joinColumns=@JoinColumn(name="id"))
  @Column(name = "blacklist")
  private List<Long> blacklist;

  public Message(Long id, String message, List<Long> blacklist) {
    this.id = id;
    this.message = message;
    this.blacklist = blacklist;
  }

  public Message(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public Long getId() {
    return this.id;
  }

  public List<Long> getBlacklist() {
    return this.blacklist;
  }
}
