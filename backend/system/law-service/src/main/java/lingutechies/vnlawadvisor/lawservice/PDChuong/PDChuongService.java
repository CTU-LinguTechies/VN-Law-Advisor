package lingutechies.vnlawadvisor.lawservice.PDChuong;

import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.FullChuongDTO;
import lingutechies.vnlawadvisor.lawservice.config.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PDChuongService {
    private final PDChuongRepository pdChuongRepository;

    public List<PDChuong> getAllChuongByDeMuc(String demucId){
        return null;
    }
    public FullChuongDTO getFullChuongById(String chuongId) throws CustomException {
        PDChuong chuong = pdChuongRepository.findById(chuongId).orElseThrow(
                () -> new CustomException("Không tìm thấy chương với id: " + chuongId, 404)
        );
        return null;
    }
}
