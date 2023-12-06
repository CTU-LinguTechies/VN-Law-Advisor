package lingutechies.vnlawadvisor.lawservice.PhapDienVBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/phapdien-vbpl")
@RequiredArgsConstructor
public class PhapDienVBPLController {
    private final PhapDienVBPLService phapDienVBPLService;

    @GetMapping()
    public Page<PhapDienVBPL> getAllByFilter(
            @RequestParam(name = "pageNo", value = "pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value = "pageSize") Optional<Integer> pageSize,
            @RequestParam(name = "deMucId", value = "deMucId") Optional<String> deMucId
    ){
        return phapDienVBPLService.getAllByFilter(pageNo, pageSize, deMucId);
    }
}
