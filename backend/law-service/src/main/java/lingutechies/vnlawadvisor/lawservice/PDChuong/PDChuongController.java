package lingutechies.vnlawadvisor.lawservice.PDChuong;

import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chuong")
@RequiredArgsConstructor
public class PDChuongController {
    private final PDChuongService pdChuongService;

    @GetMapping("/{demucId}")
    public List<PureChuongProjection> getChuongByDeMuc(@PathVariable String demucId){
        return pdChuongService.getChuongByDeMuc(demucId);
    }
}
