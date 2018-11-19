package se.lnu.ParkingZpot.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String username;
    private String password;
    private String email;


    public User() { }

    public User(String username, String password, String email) {
      super();
      this.username = username;
      this.password = password;
      
    }

    public long getId() {
      return id;
    }

    public void setId(long id) {
      this.id = id;
    }

    public void setEmail(String email){
      this.email = email;
    }
    public String getEmail(){
      return this.email;
    }
    public String getUsername() {
      return username;
    }

    public void setForename(String username) {
      this.username = username;
    }

    public String getPassword() {
      return password;
    }

    public void setSurname(String password) {
      this.password = password;
    }

}
