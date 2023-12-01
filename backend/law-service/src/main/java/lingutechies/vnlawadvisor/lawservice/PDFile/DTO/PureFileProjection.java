package lingutechies.vnlawadvisor.lawservice.PDFile.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PureFileProjection {
    private Long id;
    private String link;
    private String path;
}
