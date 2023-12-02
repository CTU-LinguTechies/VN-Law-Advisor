package lingutechies.vnlawadvisor.lawservice.PDDieu.DTO;

import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection;
import lingutechies.vnlawadvisor.lawservice.PDChuong.PDChuong;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDDieu.PDDieu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListDieuTreeViewDTO {
    private String mapc;
    private PureChuongProjection chuong;
    private PureDeMuc deMuc;
    private ChuDe chuDe;
    private List<DieuTreeViewDTO> dieus;
}
