package lingutechies.vnlawadvisor.lawservice.config.security;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthorizationFilterChain authorizationFilterChain;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Value("${app.cors.allowed-domain}")
    private String allowedDomain;

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        ArrayList<String> allowedDomains = new ArrayList<>();
        allowedDomains.add(allowedDomain);
        CorsConfiguration configuration =  new CorsConfiguration();
        configuration.setAllowedOrigins(allowedDomains);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(httpSecurityCorsConfigurer ->
                        httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable) // Temporarily :))
                .authorizeHttpRequests(
                        requests->
                                requests
                                        .requestMatchers("/","/api/v1/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                                        .requestMatchers(new AntPathRequestMatcher("/law/api/v1/user/**")).hasAnyAuthority("USER", "ADMIN")
//                                        .requestMatchers(new AntPathRequestMatcher("/law/api/v1/admin/**")).hasAuthority("ADMIN")
                                        .anyRequest().permitAll()
                )
                .userDetailsService(userDetailsService)
                .authenticationManager(authenticationManager(authenticationConfiguration))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authorizationFilterChain, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
    @Bean
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        authenticationProvider.setUserDetailsService(userDetailsService);
        return authenticationProvider;
    }
    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}