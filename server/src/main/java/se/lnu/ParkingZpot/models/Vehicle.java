package se.lnu.ParkingZpot.models;

import javax.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int user_id;
    private String registration_number;

    
    public Vehicle() { }

    public Vehicle(int user_id, String registration_number) {
      super();
      this.user_id = user_id;
      this.registration_number = registration_number;
      
    }

    public long getId() {
      return id;
    }

    public void setId(long id) {
      this.id = id;
    }

    public void setUser_Id(int user_id){
      this.user_id = user_id;
    }
    public int getUser_Id(){
      return this.user_id;
    }
    public String getRegistration_number() {
      return registration_number;
    }

    public void setRegistration_number(String registration_number) {
      this.registration_number = registration_number;
    }

}
