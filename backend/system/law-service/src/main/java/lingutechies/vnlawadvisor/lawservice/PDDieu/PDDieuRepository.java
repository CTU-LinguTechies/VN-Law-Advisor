package lingutechies.vnlawadvisor.lawservice.PDDieu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PDDieuRepository extends JpaRepository<PDDieu, String> {
    Page<PDDieu> findAllByChuong_Mapc(String mapc, Pageable pageable);
}
