package se.lnu.ParkingZpot.models;

import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String forename;
    private String surname;
    private String description;

    public Employee() { }

    public Employee(String forename, String surname, String description) {
      super();
      this.forename = forename;
      this.surname = surname;
      this.description = description;
    }

    public long getId() {
      return id;
    }

    public void setId(long id) {
      this.id = id;
    }

    public String getForename() {
      return forename;
    }

    public void setForename(String forename) {
      this.forename = forename;
    }

    public String getSurname() {
      return surname;
    }

    public void setSurname(String surname) {
      this.surname = surname;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String email) {
      this.description = email;
    }
}
