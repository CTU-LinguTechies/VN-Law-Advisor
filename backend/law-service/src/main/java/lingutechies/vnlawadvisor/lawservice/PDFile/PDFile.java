package lingutechies.vnlawadvisor.lawservice.PDFile;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.PDDieu.PDDieu;
import lombok.Data;

@Entity
@Table(name = "pdfile")
@Data
public class PDFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "dieu_id", nullable = false)
    private PDDieu fileOfDieu;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private String path;
}
