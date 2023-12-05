package lingutechies.vnlawadvisor.lawservice.ChiMucVBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/chimuc-vbpl")
@RequiredArgsConstructor
public class ChiMucVBPLController {
    private final ChiMucVBPLService chiMucVBPLService;

    @GetMapping("")
    public Page<ChiMucVBPL> getAllByFilter(
            @RequestParam(name = "pageNo", value = "pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value = "pageSize") Optional<Integer> pageSize,
            @RequestParam(name= "vbId", value = "vbId") Optional<Long> vbId,
            @RequestParam(name="name", value = "name") Optional<String> name
    ){
        return chiMucVBPLService.getAllByFilter(pageNo, pageSize, vbId, name);
    }
}
