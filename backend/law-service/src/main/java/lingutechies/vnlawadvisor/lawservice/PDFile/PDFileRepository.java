package lingutechies.vnlawadvisor.lawservice.PDFile;

import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PDFileRepository extends JpaRepository<PDFile, Long> {
    @Query("SELECT new lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection(f.id, f.link, f.path) " +
            "FROM PDFile f WHERE f.fileOfDieu.mapc = ?1 ")
    List<PureFileProjection> findAllByFileOfDieuMapc(String dieuMapc);

}
