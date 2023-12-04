package lingutechies.vnlawadvisor.lawservice.PDDieu;

import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjection;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
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

    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl(d.mapc, d.ten, d.stt, " +
            "d.noidung, d.chimuc, d.vbqppl, d.vbqpplLink) " +
            "FROM PDDieu d WHERE d.deMuc.id = ?1 AND (?2 = '' OR d.ten LIKE %?2%) ")
    Page<PureDieuProjectionImpl> findAllWithFilterWithDeMuc(String deMucId, String name, Pageable pageable);

    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl(d.mapc, d.ten, d.stt, " +
            "d.noidung, d.chimuc, d.vbqppl, d.vbqpplLink) " +
            "FROM PDDieu d WHERE ?1 = '' OR d.ten LIKE %?1% ")
    Page<PureDieuProjectionImpl> queryPureDieuWithFilter(String name, Pageable pageable);
}
