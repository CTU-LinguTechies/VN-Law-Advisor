package lingutechies.vnlawadvisor.lawservice.PDDieu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PDDieuRepository extends JpaRepository<PDDieu, String> {
    Page<PDDieu> findAllByChuongMapc(String chuongId, Pageable pageable);
}
