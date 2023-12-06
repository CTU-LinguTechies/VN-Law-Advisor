package lingutechies.vnlawadvisor.lawservice.config.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
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
    private final JWTService jwtService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.equals("Bearer")){
            // Without setting security context during chain, this request will be blocked later.
            filterChain.doFilter(request, response);
            return;
        }
        String token = authorization.substring(7);
        // String checkTokenMessage = jwtService.isTokenValid(token);
        // if (checkTokenMessage != null){
        //     sendResponse(response, checkTokenMessage, HttpStatus.FORBIDDEN);
        //     return;
        // }
        // Claims decodedToken = jwtService.extractAllClaims(token);
        // String email = decodedToken.get("email").toString();
        // String role = decodedToken.get("role").toString();
        // String id = decodedToken.get("id").toString();
        // if (email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            // UserDetails userDetails = new lingutechies.vnlawadvisor.
            //         lawservice.config.security.UserDetails(email, role, id);
            // UsernamePasswordAuthenticationToken authenticationToken = new
            //         UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            // SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        // }
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