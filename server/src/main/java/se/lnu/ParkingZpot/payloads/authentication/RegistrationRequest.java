package se.lnu.ParkingZpot.payloads.authentication;

import lombok.Getter;
import lombok.Setter;
import se.lnu.ParkingZpot.models.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Optional;
import java.util.Set;

@Getter
@Setter
public class RegistrationRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    @Email
    private String email;

    private Optional<Set<Role>> roles;
}
