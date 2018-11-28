package se.lnu.ParkingZpot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lnu.ParkingZpot.models.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    List<User> findByIdIn(List<Long> userIds);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Transactional
    Long deleteByUsername(String username);
}
