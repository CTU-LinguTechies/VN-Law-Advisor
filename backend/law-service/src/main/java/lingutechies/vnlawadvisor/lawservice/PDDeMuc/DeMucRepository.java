package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc;
import lingutechies.vnlawadvisor.lawservice.PDDieu.DTO.PureDieuProjectionImpl;
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

    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDDeMuc.DTO.PureDeMuc(d.id, d.ten, d.stt) " +
            "FROM PDDeMuc d WHERE d.ten = '' OR d.ten LIKE %?1% ")
    Page<PureDeMuc> findAll(String name , Pageable pageable);


}
