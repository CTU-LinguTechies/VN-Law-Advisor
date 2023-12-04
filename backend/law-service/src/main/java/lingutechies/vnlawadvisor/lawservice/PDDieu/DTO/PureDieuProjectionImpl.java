package lingutechies.vnlawadvisor.lawservice.PDDieu.DTO;

import lingutechies.vnlawadvisor.lawservice.PDFile.DTO.PureFileProjection;
import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Data
public class PureDieuProjectionImpl implements PureDieuProjection {
    private String mapc;
    private String ten;
    private Integer stt;
    private String noidung;
    private Integer chimuc;
    private String vbqppl;
    private String vbqpplLink;
    private List<PureFileProjection> files;
    private List<PureTableProjection> bangs;


    public PureDieuProjectionImpl(String mapc, String ten, Integer stt, String noidung, Integer chimuc, String vbqppl, String vbqpplLink) {
        this.mapc = mapc;
        this.ten = ten;
        this.stt = stt;
        this.noidung = noidung;
        this.chimuc = chimuc;
        this.vbqppl = vbqppl;
        this.vbqpplLink = vbqpplLink;
        this.files = null;
        this.bangs = null;
    }

    @Override
    public String getMapc() {
        return mapc;
    }

    @Override
    public String getTen() {
        return ten;
    }

    @Override
    public Integer getStt() {
        return stt;
    }

    @Override
    public String getNoidung() {
        return noidung;
    }

    @Override
    public Integer getChimuc() {
        return chimuc;
    }

    @Override
    public String getVbqppl() {
        return vbqppl;
    }

    @Override
    public String getVbqpplLink() {
        return vbqpplLink;
    }
}
