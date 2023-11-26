package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjection;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import lingutechies.vnlawadvisor.lawservice.PDFile.PDFileRepository;
import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lingutechies.vnlawadvisor.lawservice.PDTable.PDTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDDieuService {
    private final PDDieuRepository pdDieuRepository;
    private final PDFileRepository pdFileRepository;
    private final PDTableRepository pdTableRepository;

    public Page<PureDieuProjectionImpl> getDieuByChuong(String chuongId, Optional<Integer> pageNo, Optional<Integer> pageSize){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(10));
        Page<PureDieuProjection> result = pdDieuRepository.findAllByChuongMapcOrderByStt(chuongId, pageable);
        List<PureDieuProjectionImpl> contentImpl = new ArrayList<>();
        for (PureDieuProjection pureDieuProjection : result.getContent()) {
            String mapc = pureDieuProjection.getMapc();
            List<PureFileProjection> files = pdFileRepository.findAllByFileOfDieuMapc(mapc);
            List<PureTableProjection> bangs = pdTableRepository.findAllByBangOfDieuMapc(mapc);
            PureDieuProjectionImpl pureDieuProjectionImpl = new PureDieuProjectionImpl(
                    pureDieuProjection.getMapc(),
                    pureDieuProjection.getTen(),
                    pureDieuProjection.getStt(),
                    pureDieuProjection.getNoidung(),
                    pureDieuProjection.getChimuc(),
                    pureDieuProjection.getVbqppl(),
                    pureDieuProjection.getVbqpplLink(), files, bangs);
            // Copy other properties if needed
            contentImpl.add(pureDieuProjectionImpl);
        }

        Page<PureDieuProjectionImpl> resultImpl = new PageImpl<>(contentImpl, result.getPageable(), result.getTotalElements());
        return resultImpl;
    }
}
