package lingutechies.vnlawadvisor.lawservice.VBPL.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PureVBPLProjection {
    private Integer id;

    private String noidung;

    private String loai;

    private String ten;
}
