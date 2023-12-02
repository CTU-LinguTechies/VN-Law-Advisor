package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "pddemuc")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PDDeMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chude_id", nullable = false)
    private ChuDe chuDe;
}
