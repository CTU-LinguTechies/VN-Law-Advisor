package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDDeMucService {
    private final DeMucRepository pdDeMucRepository;
    public List<PDDeMuc> getDeMucByChuDe(String chudeId){
        return pdDeMucRepository.getPDDeMucsByChuDeIdOrderByStt(chudeId);
    }
    public Page<PDDeMuc> getAllDeMuc(Optional<Integer> pageNo, Optional<Integer> pageSize){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));
        return pdDeMucRepository.getAllDemucs(pageable);
    }
}
