package lingutechies.vnlawadvisor.lawservice.ChiMucVBPL;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiMucVBPLRepository extends JpaRepository<ChiMucVBPL, Long> {
    @Query("SELECT cmvbpl FROM ChiMucVBPL cmvbpl JOIN FETCH VBPL vbpl ON cmvbpl.vbpl.id = vbpl.id" +
            " WHERE (vbpl.id=?1 OR ?1=0 ) AND (?2 = '' OR cmvbpl.ten LIKE %?2%)")
    Page<ChiMucVBPL> getAllByQueries(Long idCha, String ten ,Pageable pageable);
}
