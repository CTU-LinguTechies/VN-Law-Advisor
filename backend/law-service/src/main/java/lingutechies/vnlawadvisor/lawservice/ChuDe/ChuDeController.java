package lingutechies.vnlawadvisor.lawservice.ChuDe;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chude")
@RequiredArgsConstructor
public class ChuDeController {
    private final ChuDeService chuDeService;
    @GetMapping("")
    public List<ChuDe> getAllChuDe(){
        return chuDeService.getAllChuDe();
    }
}
