import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { ErrorService } from './_services/error.service';
import { ConfirmationService } from './_services/confirmation.service';
import { DarkModeService } from './_services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User | null;
  errorMessage = "";
  showError = false;
  confirmationMessage = "";
  showConfirmation = false;
  darkModeEnabled = false;

  constructor(
    private authenticationService: AuthenticationService, 
    private errorService: ErrorService, 
    private confirmationService: ConfirmationService,
    private darkModeService: DarkModeService
  ) {
    this.authenticationService.user.subscribe(u => this.user = u);
    this.errorService.errorMessage.subscribe(message => this.errorMessage = message);
    this.errorService.showError.subscribe(bool => this.showError = bool);
    this.confirmationService.confirmationMessage.subscribe(message => this.confirmationMessage = message);
    this.confirmationService.showConfirmation.subscribe(bool => this.showConfirmation = bool);
    this.darkModeService.darkModeEnabled.subscribe(mode => this.darkModeEnabled = mode);
  }
}
