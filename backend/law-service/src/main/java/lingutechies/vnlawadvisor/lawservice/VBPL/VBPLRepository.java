package lingutechies.vnlawadvisor.lawservice.VBPL;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VBPLRepository extends JpaRepository<VBPL, Integer> {
    Page<VBPL> findAll(Pageable pageable);
}
