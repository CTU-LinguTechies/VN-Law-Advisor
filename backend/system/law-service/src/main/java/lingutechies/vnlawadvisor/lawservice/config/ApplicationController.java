package lingutechies.vnlawadvisor.lawservice.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ApplicationController {

    /*
         Redirect to api documents endpoint
     */
    @GetMapping("/")
    public String redirectToDocs(){
        return "redirect:/swagger-ui/index.html";
    }
}