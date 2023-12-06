package lingutechies.vnlawadvisor.lawservice.PhapDienVBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhapDienVBPLService {
    private final PhapDienVBPLRepository phapDienVBPLRepository;

    public Page<PhapDienVBPL> getAllByFilter(Optional<Integer> pageNo, Optional<Integer> pageSize, Optional<String> deMucId){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));

        System.out.println(deMucId);
        if (deMucId.isPresent()){
            return phapDienVBPLRepository.findAllByDeMucId(deMucId.get(), pageable);
        }
        return phapDienVBPLRepository.findAll(pageable);

    }
}
