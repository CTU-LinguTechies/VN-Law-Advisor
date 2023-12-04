package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.ListDieuTreeViewDTO;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.ListTableAndFormDTO;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
import lingutechies.vnlawadvisor.lawservice.config.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/filter")
    Page<PureDieuProjectionImpl> getDieuByFilter(
            @RequestParam(name = "pageNo", value = "pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value = "pageSize") Optional<Integer> pageSize,
            @RequestParam(name= "deMucId", value = "deMucId") Optional<String> demucId,
            @RequestParam(name="name", value = "name") Optional<String> name
    ){
        return pdDieuService.getDieuByFilter(demucId, name, pageNo, pageSize);
    }

    @GetMapping("/form/{mapc}")
    public ListTableAndFormDTO getListTableFormByMapc(@PathVariable String mapc) throws CustomException {
        return pdDieuService.getListTableFormByMapc(mapc);
    }

}
