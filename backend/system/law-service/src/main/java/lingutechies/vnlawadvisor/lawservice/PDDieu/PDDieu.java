package lingutechies.vnlawadvisor.lawservice.PDDieu;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.PDChuong.PDChuong;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDFile.PDFile;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "pddieu")
@Data
public class PDDieu {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String mapc;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;

    @ManyToOne
    @JoinColumn(name = "demuc_id", nullable = false)
    private PDDeMuc deMuc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chuong_id", nullable = false)
    private PDChuong chuong = null;

    @Column(nullable = false)
    private String noidung;

    @Column(nullable = false)
    private Integer chimuc;

    @Column(nullable = false)
    private String vbqppl;

    @Column(nullable = false)
    private String vbqppl_link;

    @OneToMany(mappedBy = "dieu", cascade = CascadeType.ALL)
    private List<PDFile> files;

}
