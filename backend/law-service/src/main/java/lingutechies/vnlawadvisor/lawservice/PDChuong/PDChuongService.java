package lingutechies.vnlawadvisor.lawservice.PDChuong;

import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PDChuongService {
    private final PDChuongRepository pdChuongRepository;
    public List<PureChuongProjection> getChuongByDeMuc(String deMucId){
        return pdChuongRepository.findAllByDeMucIdOrderByStt(deMucId);
    }
}
