package lingutechies.vnlawadvisor.lawservice.config.security.DTO;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lingutechies.vnlawadvisor.lawservice.config.security.Role;
import lombok.Data;

@Data
public class DecodedToken {
    private String id;
    private String email;
    private String role;
}
