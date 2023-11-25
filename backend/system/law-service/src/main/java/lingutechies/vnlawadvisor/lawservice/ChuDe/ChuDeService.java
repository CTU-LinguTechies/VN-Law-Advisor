package lingutechies.vnlawadvisor.lawservice.ChuDe;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChuDeService {
    private final ChuDeRepository chuDeRepository;

    public List<ChuDe> getAllChuDe(){
        return chuDeRepository.findAllSortByStt();
    }
}
