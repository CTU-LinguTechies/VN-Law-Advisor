package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.ListDieuTreeViewDTO;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
import lingutechies.vnlawadvisor.lawservice.config.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dieu")
@RequiredArgsConstructor
public class PDDieuController {
    private final PDDieuService pdDieuService;

    @GetMapping("/{chuongId}")
    public Page<PureDieuProjectionImpl> getDieuByChuong(@PathVariable String chuongId, Optional<Integer> pageNo, Optional<Integer> pageSize){
        return pdDieuService.getDieuByChuong(chuongId, pageNo, pageSize);
    }
    @GetMapping("/tree/{mapc}")
    public ListDieuTreeViewDTO getDieuTreeViewByMapc(@PathVariable String mapc) throws CustomException {
        return pdDieuService.getDieuTreeViewByMapc(mapc);
    }

}
