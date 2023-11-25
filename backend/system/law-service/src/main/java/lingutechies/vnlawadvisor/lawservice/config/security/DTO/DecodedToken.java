package lingutechies.vnlawadvisor.lawservice.config.security.DTO;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lingutechies.vnlawadvisor.lawservice.config.security.Role;
import lombok.Data;

@Data
public class DecodedToken {
    private Long id;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
}
