package lingutechies.vnlawadvisor.lawservice.config.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class CustomException extends Exception {
    private String message;
    private Integer httpStatusCode;
}