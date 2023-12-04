package lingutechies.vnlawadvisor.lawservice.PDDieu.DTO;

import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DieuTreeViewDTO {
    private String mapc;
    private String ten;
    private Integer stt;
    private String noidung;
    private Integer chimuc;
    private String vbqppl;
    private String vbqpplLink;

    private List<PureFileProjection> files;
    private List<PureTableProjection> bangs;
}
