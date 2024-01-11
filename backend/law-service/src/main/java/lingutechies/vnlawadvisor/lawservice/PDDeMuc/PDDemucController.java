package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/demuc")
public class PDDemucController {
    private final PDDeMucService pdDeMucService;

    @GetMapping("/chude/{chudeId}")
    public List<PureDeMuc> getDeMucByChuDe(@PathVariable String chudeId){
        return pdDeMucService.getDeMucByChuDe(chudeId);
    }

    @GetMapping("")
    public Page<PureDeMuc> getAllDeMuc(
            @RequestParam(name = "pageNo", value = "pageNo", defaultValue = "") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value = "pageSize", defaultValue = "") Optional<Integer> pageSize,
            @RequestParam(name = "name", value = "name", defaultValue = "") Optional<String> name
    ){
        return pdDeMucService.getAllDeMuc(name, pageNo, pageSize);
    }

    @GetMapping("/all")
    public List<PDDeMuc> getAllDeMuc(){
        return pdDeMucService.getAllDeMuc();
    }
    @GetMapping("{id}")
    public PDDeMuc getDeMucById(@PathVariable String id){
        return pdDeMucService.getDeMucById(id);
    }

}
