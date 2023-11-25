package lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PureDeMuc {
    private String id;

    private String ten;

    private Integer stt;
}
