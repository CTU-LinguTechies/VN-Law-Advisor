package lingutechies.vnlawadvisor.lawservice.PDChuong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PDChuongRepository extends JpaRepository<PDChuong, String> {
    List<PDChuong> findAllByDeMucIdOrderByStt(String deMucId);
}
