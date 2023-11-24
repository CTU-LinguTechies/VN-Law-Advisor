package lingutechies.vnlawadvisor.lawservice.ChuDe;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pdchude")
public class ChuDe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;
}
