import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { ErrorService } from './_services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User | null;
  errorMessage = this.errorService.errorMessage;
  showError = this.errorService.showError;

  constructor(private authenticationService: AuthenticationService, private errorService: ErrorService) {
    this.authenticationService.user.subscribe(u => this.user = u);
  }
}
