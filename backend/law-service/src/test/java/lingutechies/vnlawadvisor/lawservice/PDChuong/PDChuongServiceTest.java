package lingutechies.vnlawadvisor.lawservice.PDChuong;

import jakarta.transaction.Transactional;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDe;
import lingutechies.vnlawadvisor.lawservice.ChuDe.ChuDeRepository;
import lingutechies.vnlawadvisor.lawservice.PDChuong.DTO.PureChuongProjection;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.DeMucRepository;
import lingutechies.vnlawadvisor.lawservice.PDDeMuc.PDDeMuc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
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
    @Autowired
    PDChuongRepository pdChuongRepository;
    PDDeMuc deMuc;
    PDDeMuc deMuc2;

    ChuDe chuDe;

    PDChuong chuong1;
    PDChuong chuong2;
    PDChuong chuong3;
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
        deMuc2 = deMucRepository.save(
                PDDeMuc.builder()
                        .ten("mocked-demuc2")
                        .stt(1)
                        .chuDe(chuDe)
                        .build()
        );
        deMuc = deMucRepository.save(deMuc);
        chuong1 = PDChuong.builder()
                .ten("mocked-chuong1")
                .stt(0)
                .deMuc(deMuc)
                .chimuc("I")
                .build();
        chuong2 = PDChuong.builder()
                .ten("mocked-chuong2")
                .stt(1)
                .deMuc(deMuc)
                .chimuc("II")
                .build();
        chuong3 = PDChuong.builder()
                .ten("mocked-chuong3")
                .stt(2)
                .deMuc(deMuc2)
                .chimuc("III")
                .build();
        chuong1 = pdChuongRepository.save(chuong1);
        chuong2 = pdChuongRepository.save(chuong2);
        chuong3 = pdChuongRepository.save(chuong3);
    }
    @Test
    void getChuongByDeMucShouldReturnAllChuong() {
        // When
        List<PureChuongProjection> result = underTest.getChuongByDeMuc(deMuc.getId());
        // Then
        assertEquals(2, result.size());
        assertEquals(chuong1.getTen(), result.get(0).getTen());
        assertEquals(chuong2.getTen(), result.get(1).getTen());
        assertThat(result.get(0)).isNotInstanceOf(
                PDChuong.class
        );

    }
    @Test
    void getChuongByDeMucShouldReturnEmptyListWhenDeMucIdIsInvalid() {
        // When
        var result = underTest.getChuongByDeMuc("invalid-id");
        // Then
        assertEquals(0, result.size());
    }
    @Test
    void getChuongByDeMucShouldReturnEmptyListWhenDeMucIdIsNull() {
        // When
        var result = underTest.getChuongByDeMuc(null);
        // Then
        assertEquals(0, result.size());
    }
    @Test
    void getChuongByDeMucShouldReturnInOrder() {
        // When
        List<PureChuongProjection> result = underTest.getChuongByDeMuc(deMuc.getId());
        // Then
        assertEquals(2, result.size());
        assertEquals(chuong1.getTen(), result.get(0).getTen());
        assertEquals(chuong2.getTen(), result.get(1).getTen());
    }
}