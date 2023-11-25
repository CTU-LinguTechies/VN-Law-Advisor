package lingutechies.vnlawadvisor.lawservice.PDTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PDTableRepository extends JpaRepository<PDTable, Long> {
}
