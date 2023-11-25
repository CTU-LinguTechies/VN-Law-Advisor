package lingutechies.vnlawadvisor.lawservice.config.security;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return null;
    }
}
