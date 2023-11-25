package lingutechies.vnlawadvisor.lawservice.PDChuong;

import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PDChuongRepository extends JpaRepository<PDChuong, String> {
    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection(c.mapc, c.ten, " +
            "c.chimuc, c.stt) " +
            "FROM PDChuong c WHERE c.deMuc.id = ?1 " +
            "ORDER BY c.stt")
    List<PureChuongProjection> findAllByDeMucIdOrderByStt(String deMucId);
}
