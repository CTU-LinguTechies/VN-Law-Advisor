package lingutechies.vnlawadvisor.lawservice.VBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vbpl")
@RequiredArgsConstructor
public class VBPLController {
    private final VBPLService VBPLService;

    @GetMapping("")
    public Page<VBPL> getAllVBPL(Optional<Integer> pageNo, Optional<Integer> pageSize){
        return VBPLService.getAllVBPL(pageNo, pageSize);
    }

    @GetMapping("/{vbplId}")
    public VBPL getVBPLbyID(@PathVariable Integer vbplId){
        return VBPLService.getVBPLbyID(vbplId);
    }
}
