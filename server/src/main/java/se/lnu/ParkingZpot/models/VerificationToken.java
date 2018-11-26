package se.lnu.ParkingZpot.models;

import java.util.*;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "verification_tokens")
public class VerificationToken {
    private static final int EXPIRATION = 60 * 24;
 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
     
    private String token;
   
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
     
    private Date expiryDate;

    public VerificationToken(User user, String token) {
      this.user = user;
      this.token = token;
    }
    
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
}