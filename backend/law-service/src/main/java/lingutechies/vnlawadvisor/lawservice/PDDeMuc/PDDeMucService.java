package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
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
    public List<PureDeMuc> getDeMucByChuDe(String chudeId){
        return pdDeMucRepository.findAllByChuDeId(chudeId);
    }
    public Page<PureDeMuc> getAllDeMuc(Optional<String> name , Optional<Integer> pageNo, Optional<Integer> pageSize){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(5));
        return pdDeMucRepository.findAll(name.orElse(""), pageable);
    }
    public List<PDDeMuc> getAllDeMuc(){
        return pdDeMucRepository.findAll();
    }
    public PDDeMuc getDeMucById(String id){
        return pdDeMucRepository.findById(id).orElse(null);
    }
}
