package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Table(name = "pddemuc")
@Builder
public class PDDeMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chude_id", nullable = false)
    private ChuDe chuDe;
}
