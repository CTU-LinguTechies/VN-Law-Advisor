package lingutechies.vnlawadvisor.lawservice.ChuDe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChuDeRepository extends JpaRepository<ChuDe, String> {
    @Query("SELECT c FROM ChuDe c ORDER BY c.stt")
    List<ChuDe> findAllSortByStt();
}
