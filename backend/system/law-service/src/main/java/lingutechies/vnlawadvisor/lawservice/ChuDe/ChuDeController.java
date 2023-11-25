package lingutechies.vnlawadvisor.lawservice.ChuDe;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/law/api/v1/chude")
@RequiredArgsConstructor
public class ChuDeController {
    private final ChuDeService chuDeService;
    public List<ChuDe> getAllChuDe(){
        return chuDeService.getAllChuDe();
    }
}
