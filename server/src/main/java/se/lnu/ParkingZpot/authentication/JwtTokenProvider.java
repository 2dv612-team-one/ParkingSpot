package se.lnu.ParkingZpot.authentication;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import se.lnu.ParkingZpot.payloads.InternalMessages;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error(InternalMessages.ERROR_JWT_INVALID_SIGN);
        } catch (MalformedJwtException ex) {
            logger.error(InternalMessages.ERROR_JWT_INVALID_TOKEN);
        } catch (ExpiredJwtException ex) {
            logger.error(InternalMessages.ERROR_JWT_EXPIRED);
        } catch (UnsupportedJwtException ex) {
            logger.error(InternalMessages.ERROR_JWT_UNSUPPORTED);
        } catch (IllegalArgumentException ex) {
            logger.error(InternalMessages.ERROR_JWT_EMPTY_CLAIMS);
        }
        return false;
    }
}
