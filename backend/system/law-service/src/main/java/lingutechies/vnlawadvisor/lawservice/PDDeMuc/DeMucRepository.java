package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeMucRepository extends JpaRepository<PDDeMuc, String> {
    List<PDDeMuc> getPDDeMucsByChuDeIdOrderByStt(String chudeId);

    Page<PDDeMuc> getAllDemucs(Pageable pageable);
}
