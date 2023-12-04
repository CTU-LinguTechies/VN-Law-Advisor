package lingutechies.vnlawadvisor.lawservice.config.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import lingutechies.vnlawadvisor.lawservice.config.security.DTO.DecodedToken;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthorizationFilterChain extends OncePerRequestFilter {
    private final RestTemplate restTemplate = new RestTemplate();
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.equals("Bearer")){
            // Without setting security context during chain, this request will be blocked later.
            filterChain.doFilter(request, response);
            return;
        }
        String token = authorization.substring(7);
        DecodedToken decodedToken = null;
        try{
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);
            HttpEntity<String> entity = new HttpEntity<>("body", headers);
            decodedToken = restTemplate.postForObject(
                    "http://auth-service/auth/validate",
                    entity,
                    DecodedToken.class
            );
        }
        catch (Exception exception){
            System.out.println(exception.getMessage());
            sendResponse(response, "You are not authenticated", HttpStatus.UNAUTHORIZED);
        }
        if (decodedToken != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = new lingutechies.vnlawadvisor.lawservice.config.security.UserDetails(
                    decodedToken.getEmail(),
                    decodedToken.getRole(),
                    decodedToken.getId()
            );
            UsernamePasswordAuthenticationToken authenticationToken = new
                    UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request, response);
    }

    private HttpServletResponse sendResponse(HttpServletResponse response, String message, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", message);
        response.setContentType("application/json");

        // Write the response body
        ObjectMapper mapper = new ObjectMapper();
        PrintWriter out = response.getWriter();
        mapper.writeValue(out, responseBody);
        out.flush();
        out.close();
        return response;
    }
}