package lingutechies.vnlawadvisor.lawservice.PDDieu.DTO;

import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ListTableAndFormDTO {
    List<PureTableProjection> bangs;
    List<PureFileProjection> files;

}
