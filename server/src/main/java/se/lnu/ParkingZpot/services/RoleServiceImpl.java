package se.lnu.ParkingZpot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.repositories.RoleRepository;

import java.util.List;
import java.util.Optional;

@Component
public class RoleServiceImpl implements RoleService {

  private final RoleRepository roleRepository;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public List<Role> getAllRoles() {
    return roleRepository.findAll();
  }

  @Override
  public Optional<Role> findByName(String name) {
    return roleRepository.findByName(name);
  }
}
