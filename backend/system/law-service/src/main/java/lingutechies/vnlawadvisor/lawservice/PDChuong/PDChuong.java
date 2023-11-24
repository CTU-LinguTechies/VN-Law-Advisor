package lingutechies.vnlawadvisor.lawservice.PDChuong;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import lombok.Data;

@Data
@Entity
@Table(name = "pdchuong")
public class PDChuong {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String mapc;

    @Column(nullable = false)
    private String ten;

    @ManyToOne
    @JoinColumn(name = "demuc_id", nullable = false)
    private PDDeMuc deMuc;

    @Column(nullable = false)
    private String chimuc;

    @Column(nullable = false)
    private Integer stt;
}
