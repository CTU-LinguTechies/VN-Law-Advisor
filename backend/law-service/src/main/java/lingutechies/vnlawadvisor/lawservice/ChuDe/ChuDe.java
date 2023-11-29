package lingutechies.vnlawadvisor.lawservice.ChuDe;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "pdchude")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChuDe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;
}
