package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDDieuService {
    private final PDDieuRepository pdDieuRepository;

    public Page<PDDieu> getDieuByChuong(String chuongId, Optional<Integer> pageNo, Optional<Integer> pageSize){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));
        return pdDieuRepository.findAllByChuongMapc(chuongId, pageable);
    }
}
