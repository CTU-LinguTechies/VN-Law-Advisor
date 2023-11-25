package lingutechies.vnlawadvisor.lawservice;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@OpenAPIDefinition(servers = {@Server(url = "/", description = "Default Server URL")})
public class LawServiceApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(LawServiceApplication.class, args);
	}

}
