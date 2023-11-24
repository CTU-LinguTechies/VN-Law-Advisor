package lingutechies.vnlawadvisor.lawservice.PDDeMuc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeMucRepository extends JpaRepository<PDDeMuc, String> {
}
