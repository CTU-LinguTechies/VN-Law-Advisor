package lingutechies.vnlawadvisor.lawservice.VBPL;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VBPLService {
    private final VBPLRepository VBPLRepository;

    public Page<VBPL> getAllVBPL(Optional<Integer> pageNo, Optional<Integer> pageSize){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));
        return VBPLRepository.findAll(pageable);
    }

    public VBPL getVBPLbyID(Integer id){
        Optional<VBPL> optionalVBPL = VBPLRepository.findById(id);
        if (optionalVBPL.isPresent()) {
            return optionalVBPL.get();
        } else {
            return null;
        }
    }
}
