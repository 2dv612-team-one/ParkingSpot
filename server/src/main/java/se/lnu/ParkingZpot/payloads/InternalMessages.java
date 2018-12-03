package se.lnu.ParkingZpot.payloads;

import lombok.NoArgsConstructor;
import lombok.AccessLevel;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class InternalMessages {
  public static final String ERROR_UNAUTHORIZED = "UNAUTHORIZED";
  public static final String ERROR_AUTH_CONTEXT = "Could not set user authentication in authentication context";
  public static final String ERROR_JWT_INVALID_SIGN = "Invalid JWT signature";
  public static final String ERROR_JWT_INVALID_TOKEN = "Invalid JWT token";
  public static final String ERROR_JWT_EXPIRED = "Expired JWT token";
  public static final String ERROR_JWT_UNSUPPORTED = "Unsupported JWT token";
  public static final String ERROR_JWT_EMPTY_CLAIMS = "JWT claims string is empty.";
  public static final String ERROR_MAILFAIL = "Email could not be sent.";
  public static final String ERROR_REG_VERIFICATION_REDIRECT= "Verification redirect went wrong.";
  public static final String ERROR_DELETION_EMPTY = "The entity that attempted to be removed does not exist.";

}