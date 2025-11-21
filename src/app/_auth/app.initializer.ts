import { AuthenticationService } from "../_services/authentication.service";
import { catchError, of } from "rxjs";


export function appIntializer(authenticationService: AuthenticationService) {
  // Complete the returned observable whether the request succeeds or not
  // so the app can start
  return () => authenticationService.refreshToken().pipe(catchError(() => of()));
}