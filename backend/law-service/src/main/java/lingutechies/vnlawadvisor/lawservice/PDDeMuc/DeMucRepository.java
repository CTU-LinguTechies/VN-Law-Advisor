package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeMucRepository extends JpaRepository<PDDeMuc, String> {
    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc(d.id, d.ten, d.stt) " +
            "FROM PDDeMuc d WHERE d.chuDe.id = ?1 " +
            "ORDER BY d.stt")
    List<PureDeMuc> findAllByChuDeId(String chudeId);

    Page<PDDeMuc> findAll(Pageable pageable);
}
