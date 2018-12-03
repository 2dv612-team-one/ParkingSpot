package se.lnu.ParkingZpot.controllers.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lnu.ParkingZpot.models.Role;
import se.lnu.ParkingZpot.services.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

  private final RoleService roleService;

  @Autowired
  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @GetMapping
  public List<Role> getRoles() {
    return roleService.getAllRoles();
  }

}
