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
  public static final String PArea = "Parkeringsplatsen";
  public static final String PARKING = "Parkeringen";
  public static final String REG_ERROR_USERNAME = "Användarnamnet finns redan.";
  public static final String REG_ERROR_EMAIL = "Mailadressen är redan registrerad.";
  public static final String REG_ERROR_EXISTS_ROLE = "Rollen finns inte i systemet: ";
  public static final String REG_ERROR_GIVEN_ROLE = "Ingen roll specificerad för användaren.";
  public static final String USER_DEL_SUCCESS = "Användare borttagen";
  public static final String USER_DEL_ERROR = "Ett fel uppstod, användaren kan inte tas bort";
  public static final String UNAUTH_CRUD = "Du är inte tillåten att utföra denna operation.";
  public static final String USER_NOT_FOUND = "Det finns ingen användare med detta namn";
  public static final String USER_UPDATE_SUCCESS = "Användaren har blivit uppdaterad";
  public static final String USER_PASSWORD_UPDATE_FAIL_SAME = "Nya lösenordet kan inte vara samma som det gamla";
  public static final String USER_EMAIL_UPDATE_FAIL = "Ny email kan inte vara samma som det gamla";
  public static final String ACCESS_DENIED = "Du har inte tillgång till detta objekt";
  public static final String CANNOT_MODIFY = "Objekten du försöker modifiera används redan.";


  private static String added = " har lagts till i databasen.";
  private static String updated = " har uppdaterats.";
  private static String exists = " finns redan i databasen.";
  private static String deleted = " har tagits bort ur databasen.";
  private static String doesNotExist = " existerar inte i databasen.";

  public static String addSuccess(String entity) {
    return entity + Messages.added;
  }

  public static String updateSuccess(String entity) {
    return entity + Messages.updated;
  }

  public static String entityExists(String entity) {
    return entity + Messages.exists;
  }

  public static String entityDeleted(String entity) {
    return entity + Messages.deleted;
  }

  public static String entityNotFound(String entity) {
    return entity + Messages.doesNotExist;
  }
}
