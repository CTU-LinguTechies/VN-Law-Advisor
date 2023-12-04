package lingutechies.vnlawadvisor.lawservice.PDDieu;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.PDChuong.PDChuong;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDFile.PDFile;
import lingutechies.vnlawadvisor.lawservice.PDTable.PDTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "pddieu")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PDDieu {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String mapc;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private Integer stt;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demuc_id", nullable = false)
    private PDDeMuc deMuc;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chude_id", nullable = false)
    private ChuDe chuDe;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chuong_id", nullable = false)
    private PDChuong chuong;

    @Column(nullable = false)
    private String noidung;

    @Column(nullable = false)
    private Integer chimuc;

    @Column(name = "vbqppl", nullable = false)
    private String vbqppl;

    @Column(name = "vbqppl_link",nullable = false)
    private String vbqpplLink;

    @OneToMany(mappedBy = "fileOfDieu", fetch = FetchType.EAGER)
    private List<PDFile> files;

    @OneToMany(mappedBy = "bangOfDieu", fetch = FetchType.EAGER)
    private List<PDTable> bangs;
}
