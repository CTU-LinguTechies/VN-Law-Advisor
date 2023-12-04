package lingutechies.vnlawadvisor.lawservice.VBPL;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "vbpldaydu")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VBPL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String noidung;

    @Column(nullable = false)
    private String loai;

    @Column(nullable = false)
    private String ten;
}
