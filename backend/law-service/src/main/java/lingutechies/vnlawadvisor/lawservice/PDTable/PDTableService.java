package lingutechies.vnlawadvisor.lawservice.PDTable;

import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDTableService {
    private final PDTableRepository pdTableRepository;

    public Page<PureTableProjection> getAllTable(Optional<String> name, Optional<Integer> pageNo,
                                                 Optional<Integer> pageSize) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(5));
        return pdTableRepository.findAllByFilter(name.orElse(""), pageable);
    }
}
