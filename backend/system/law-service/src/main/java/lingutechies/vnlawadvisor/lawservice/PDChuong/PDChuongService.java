package lingutechies.vnlawadvisor.lawservice.PDChuong;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PDChuongService {
    private final PDChuongRepository pdChuongRepository;
    public List<PDChuong> getChuongByDeMuc(String deMucId){
        return pdChuongRepository.findAllByDeMucIdOrderByStt(deMucId);
    }
}
