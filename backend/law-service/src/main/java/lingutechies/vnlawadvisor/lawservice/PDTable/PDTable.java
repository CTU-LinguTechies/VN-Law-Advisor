package lingutechies.vnlawadvisor.lawservice.PDTable;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.PDDieu.PDDieu;
import lombok.Data;

@Entity
@Table(name = "pdtable")
@Data
public class PDTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dieu_id", nullable = false)
    private PDDieu bangOfDieu;

    @Column(nullable = false)
    private String html;
}
