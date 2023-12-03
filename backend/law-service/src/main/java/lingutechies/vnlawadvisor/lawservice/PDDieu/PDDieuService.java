package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDeRepository;
import lingutechies.vnlawadvisor.lawservice.PDChuong.PDChuong;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DeMucRepository;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.*;
import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import lingutechies.vnlawadvisor.lawservice.PDFile.PDFileRepository;
import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lingutechies.vnlawadvisor.lawservice.PDTable.PDTableRepository;
import lingutechies.vnlawadvisor.lawservice.config.exception.CustomException;
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
    private final DeMucRepository pdDeMucRepository;
    private final ChuDeRepository pdChuDeRepository;

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

    public ListDieuTreeViewDTO getDieuTreeViewByMapc(String mapc) throws CustomException {
        PDDieu pdDieu = pdDieuRepository.findById(mapc).orElseThrow(
                () -> new CustomException("Không tồn tại điều này", 404)
        );
        PDChuong pdChuong = pdDieu.getChuong();
        List<PureDieuProjection> dieus = pdDieuRepository.findAllByChuongMapcOrderByStt(pdChuong.getMapc());
        List<DieuTreeViewDTO> dieuTreeViewDTOS = new ArrayList<>();
        for (PureDieuProjection pureDieuProjection : dieus) {
            mapc = pureDieuProjection.getMapc();
            List<PureFileProjection> files = pdFileRepository.findAllByFileOfDieuMapc(mapc);
            List<PureTableProjection> bangs = pdTableRepository.findAllByBangOfDieuMapc(mapc);
            DieuTreeViewDTO newDieu = DieuTreeViewDTO.builder()
                    .mapc(pureDieuProjection.getMapc())
                    .ten(pureDieuProjection.getTen())
                    .stt(pureDieuProjection.getStt())
                    .noidung(pureDieuProjection.getNoidung())
                    .chimuc(pureDieuProjection.getChimuc())
                    .vbqppl(pureDieuProjection.getVbqppl())
                    .vbqpplLink(pureDieuProjection.getVbqpplLink())
                    .files(files)
                    .bangs(bangs)
                    .build();
            dieuTreeViewDTOS.add(newDieu);
        }
        ChuDe chuDe = pdChuDeRepository.findById(pdDieu.getChuDe().getId()).orElseThrow(
                () -> new CustomException("Không tồn tại chủ đề này", 404)
        );

        return ListDieuTreeViewDTO.builder()
                .mapc(pdChuong.getMapc())
                .chuong(
                        lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection.builder()
                                .mapc(pdChuong.getMapc())
                                .ten(pdChuong.getTen())
                                .chimuc(pdChuong.getChimuc())
                                .stt(pdChuong.getStt())
                                .build()
                )
                .deMuc(
                        lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc.builder()
                                .id(pdDieu.getDeMuc().getId())
                                .ten(pdDieu.getDeMuc().getTen())
                                .stt(pdDieu.getDeMuc().getStt())
                                .build()
                )
                .chuDe(
                        lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe.builder()
                                .id(chuDe.getId())
                                .ten(chuDe.getTen())
                                .stt(chuDe.getStt())
                                .build()
                )
                .dieus(dieuTreeViewDTOS)
                .build();
    }

    public Page<PureDieuProjectionImpl> getDieuByFilter(Optional<String> demucId, Optional<String> name,
                                                        Optional<Integer> pageNo, Optional<Integer> pageSize) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(4));
        if (demucId.isPresent()){
            return pdDieuRepository.findAllWithFilterWithDeMuc(demucId.get(), name.orElse(""), pageable);
        }
        return pdDieuRepository.queryPureDieuWithFilter(name.orElse(""), pageable);
    }

    public ListTableAndFormDTO getListTableFormByMapc(String mapc) throws CustomException {
        List<PureFileProjection> files = pdFileRepository.findAllByFileOfDieuMapc(mapc);
        List<PureTableProjection> bangs = pdTableRepository.findAllByBangOfDieuMapc(mapc);
        return new ListTableAndFormDTO(bangs, files);
    }
}
