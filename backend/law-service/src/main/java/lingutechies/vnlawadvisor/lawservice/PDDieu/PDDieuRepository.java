package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PDDieuRepository extends JpaRepository<PDDieu, String> {
    Page<PureDieuProjection> findAllByChuongMapcOrderByStt(String chuongMaPc, Pageable pageable);
    List<PureDieuProjection> findAllByChuongMapcOrderByStt(String chuongMaPc);
}
