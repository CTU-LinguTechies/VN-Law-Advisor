package lingutechies.vnlawadvisor.lawservice.PhapDienVBPL;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PhapDienVBPLRepository extends JpaRepository<PhapDienVBPL, String> {

    Page<PhapDienVBPL> findAllByDeMucId(String deMucId, Pageable pageable);
    Page<PhapDienVBPL> findAll(Pageable pageable);

}
