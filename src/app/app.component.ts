import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { ErrorService } from './_services/error.service';
import { ConfirmationService } from './_services/confirmation.service';
import { UserService } from './_services/user.service';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation, confirmationPopUpAnimation, errorPopUpAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation, confirmationPopUpAnimation, errorPopUpAnimation]
})
export class AppComponent {
  user?: User | null;
  errorMessage = "";
  showError = false;
  confirmationMessage = "";
  showConfirmation = false;
  usingMobileDevice = false;

  constructor(
    private authenticationService: AuthenticationService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private contexts: ChildrenOutletContexts
  ) {
    this.authenticationService.user.subscribe(u => this.user = u);
    this.errorService.errorMessageObservable.subscribe(message => this.errorMessage = message);
    this.errorService.showErrorObservable.subscribe(bool => this.showError = bool);
    this.confirmationService.confirmationMessageObservable.subscribe(message => this.confirmationMessage = message);
    this.confirmationService.showConfirmationObservable.subscribe(bool => this.showConfirmation = bool);
    this.usingMobileDevice = this.userService.usingMobileDevice;
  }

  // Get the specific animation defined for each route in app-routing.module.ts
  getRouteAnimationData() {
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
  }
}
