package lingutechies.vnlawadvisor.lawservice.config.security;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class JWTService {
    @Value("${jwt.access-token-validity}")
    private Long ACCESS_TOKEN_EXPIRATION_TIME;

    @Value("${jwt.secret-key}")
    private final String SECRET_KEY = "5368566D597133743677397A24432646294A404E635166546A576E5A72347537";

    @Value("${jwt.secret-refresh-key}")
    private final String SECRET_REFRESH_KEY = "ES8SNaJqxSQ16RvVsDkMDuZrbjLiSfZMsAePtFS9edjbY37920suNnQ5nSe7uKDJ";

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token).getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver, Key secret) {
        final Claims claims = extractAllClaims(token, secret);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token, Key secret) {
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
    }
    public String isTokenValid(String token) {
        if (token == null)
            return "Token cannot be empty";
        try {
            final String username = extractClaim(token, Claims::getSubject);
            final boolean isTokenExpired = extractClaim(token, Claims::getExpiration).after(new Date());
            if (!isTokenExpired)
                return "Token Expired";
            return null;
        } catch (MalformedJwtException e) {
            return "Token Malformed!";
        } catch (ExpiredJwtException e) {
            return "Token expired!";
        } catch (UnsupportedJwtException e) {
            return "Token unsupported!";
        } catch (IllegalArgumentException e) {
            return "JWT claims string is empty";
        }
    }

    public String isRefreshTokenValid(String token) {
        if (token == null)
            return "Token cannot be empty";
        try {
            // final String username = extractClaim(token, Claims::getSubject,
            // getSecretRefreshKey());
            final boolean isTokenExpired = extractClaim(token, Claims::getExpiration, getSecretRefreshKey())
                    .after(new Date());
            if (!isTokenExpired)
                return "Token Expired";
            return null;
        } catch (MalformedJwtException e) {
            return "Token Malformed!";
        } catch (ExpiredJwtException e) {
            return "Token expired!";
        } catch (UnsupportedJwtException e) {
            return "Token unsupported!";
        } catch (IllegalArgumentException e) {
            return "JWT claims string is empty";
        }
    }

    public String signAccessToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(getSecretKey())
                .compact();
    }

    public String signRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 24 * 1000))
                .signWith(getSecretRefreshKey())
                .compact();
    }

    private Key getSecretKey() {
        byte[] KeyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

    private Key getSecretRefreshKey() {
        byte[] KeyBytes = Decoders.BASE64.decode(SECRET_REFRESH_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }
}