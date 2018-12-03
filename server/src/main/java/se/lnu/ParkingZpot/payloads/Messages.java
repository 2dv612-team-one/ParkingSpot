package se.lnu.ParkingZpot.payloads;

import lombok.NoArgsConstructor;
import lombok.AccessLevel;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Messages {
  public static final String REG_WELCOME_MAIL_SUBJECT = "Välkommen till Parking Zpot";
  public static final String REG_WELCOME_MAIL_BODY = "En administratör har registrerat dig för tjänsten.";
  public static final String REG_SUCCESS = "Användaren har registrerats.";
  public static final String REG_MAILFAIL = "Användaren har registrerats.";
  public static final String LOGIN_UNVERIFIED = "Användaren har inte verifierat kontot.";
  public static final String REG_VERIFICATION_REDIRECT_ERROR = "Användaren kunde inte omdirigeras efter verifikationen.";
  public static final String VERIFY_FAIL = "<p>Din verifieringstoken kan inte hittas, eller har gått ut. Försök gärna att registrera dig igen, och kom ihåg att verifiera din mailaddress inom 24 timmar.</p>";
  public static final String VEHICLE = "Fordonet";
  public static final String REG_ERROR_USERNAME = "Användarnamnet finns redan.";
  public static final String REG_ERROR_EMAIL = "Mailadressen är redan registrerad.";
  public static final String REG_ERROR_EXISTS_ROLE = "Rollen finns inte i systemet: ";
  public static final String REG_ERROR_GIVEN_ROLE = "Ingen roll specificerad för användaren.";


  private static String added = " har lagts till i databasen.";
  private static String exists = " finns redan i databasen.";
  
  public static String addSuccess(String entity) {
    return entity + Messages.added;
  }

  public static String entityExists(String entity) {
    return entity + Messages.exists;
  }
}