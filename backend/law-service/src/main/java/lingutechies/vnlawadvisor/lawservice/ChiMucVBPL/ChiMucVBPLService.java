package lingutechies.vnlawadvisor.lawservice.ChiMucVBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChiMucVBPLService {
    private final ChiMucVBPLRepository chiMucVBPLRepository;

    public Page<ChiMucVBPL> getAllByFilter(Optional<Integer> pageNo, Optional<Integer> pageSize, Optional<Long> vbId, Optional<String> ten){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));
        return chiMucVBPLRepository.getAllByQueries(vbId.orElse(0L), ten.orElse(""), pageable);
    }
}
