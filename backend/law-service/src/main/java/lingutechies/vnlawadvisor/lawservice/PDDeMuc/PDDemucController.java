package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/demuc")
public class PDDemucController {
    private final PDDeMucService pdDeMucService;

    @GetMapping("/{chudeId}")
    public List<PureDeMuc> getDeMucByChuDe(@PathVariable String chudeId){
        return pdDeMucService.getDeMucByChuDe(chudeId);
    }

}
