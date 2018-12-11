package se.lnu.ParkingZpot.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmMessageRequest {
  
  private Long id;

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

}
