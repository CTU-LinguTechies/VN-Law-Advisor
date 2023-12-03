package lingutechies.vnlawadvisor.lawservice.PDTable;

import lingutechies.vnlawadvisor.lawservice.PDTable.DTO.PureTableProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/table")
@RequiredArgsConstructor
public class PDTableController {
    private final PDTableService pdTableService;

    @GetMapping("")
    public Page<PureTableProjection> getAllTable(
            @RequestParam(name = "pageNo", value = "pageNo", defaultValue = "") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value = "pageSize", defaultValue = "") Optional<Integer> pageSize,
            @RequestParam(name = "name", value = "name", defaultValue = "") Optional<String> name
    ){
        return pdTableService.getAllTable(name, pageNo, pageSize);
    }
}
