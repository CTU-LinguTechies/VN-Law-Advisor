package lingutechies.vnlawadvisor.lawservice.PDChuong;

import jakarta.transaction.Transactional;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDeRepository;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DeMucRepository;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PDChuongServiceTest {
    @Autowired
    PDChuongService underTest;

    @Autowired
    DeMucRepository deMucRepository;

    @Autowired
    ChuDeRepository chuDeRepository;
    PDDeMuc deMuc;

    ChuDe chuDe;

    @BeforeEach
    public void insertData(){
        chuDe = ChuDe.builder()
                .ten("mocked-chude")
                .stt(0)
                .build();
        chuDe = chuDeRepository.save(chuDe);
        deMuc = PDDeMuc.builder()
                .ten("mocked-demuc")
                .stt(0)
                .chuDe(chuDe)
                .build();
        deMuc = deMucRepository.save(deMuc);
    }
    @Test
    void getChuongByDeMuc() {
    }
}