package se.lnu.ParkingZpot.models;

import javax.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long user_id;
    private String registrationNumber;

    
    public Vehicle() { }

    public Vehicle(long user_id, String registrationNumber) {
      super();
      this.user_id = user_id;
      this.registrationNumber = registrationNumber;
      
    }

    public long getId() {
      return id;
    }

    public void setId(long id) {
      this.id = id;
    }

    public void setUser_Id(long user_id){
      this.user_id = user_id;
    }
    public long getUser_Id(){
      return this.user_id;
    }
    public String getRegistrationNumber() {
      return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
      this.registrationNumber = registrationNumber;
    }

}
