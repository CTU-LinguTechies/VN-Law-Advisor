package lingutechies.vnlawadvisor.lawservice.PDChuong.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PureChuongProjection {
    private String mapc;

    private String ten;

    private String chimuc;

    private Integer stt;
}
