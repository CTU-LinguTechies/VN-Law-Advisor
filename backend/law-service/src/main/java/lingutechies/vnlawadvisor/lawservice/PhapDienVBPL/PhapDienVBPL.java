package lingutechies.vnlawadvisor.lawservice.PhapDienVBPL;

import jakarta.persistence.*;
import lingutechies.vnlawadvisor.lawservice.VBPL.VBPL;
import lingutechies.vnlawadvisor.lawservice.ChiMucVBPL.ChiMucVBPL;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@Entity
@Table(name="vbplchuapd")
@NoArgsConstructor
public class PhapDienVBPL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="noi_dung", columnDefinition = "TEXT", nullable = false)
    private String noi_dung;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chi_muc_cha")
    private ChiMucVBPL chi_muc_cha;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_vb")
    private VBPL vbpl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "demuc_id")
    private PDDeMuc deMuc;

}
