import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from '../_services/error.service';
import { ConfirmationService } from '../_services/confirmation.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css', './settings-page.component-mobile.css']
})
export class SettingsPageComponent implements OnInit {
  isEditing: boolean = false;

  credentialsForm = new FormGroup({
    email: new FormControl({ value: this.authenticationService.userValue?.email, disabled: !this.isEditing }, Validators.required),
    password: new FormControl({ value: "", disabled: !this.isEditing }, [Validators.required, Validators.minLength(8)])
  });

  get email() {
    return this.credentialsForm.get("email");
  }

  get password() {
    return this.credentialsForm.get("password");
  }

  editCredentials() {
    this.isEditing = true;
    this.email?.enable();
    this.password?.enable();
  }

  saveCredentials() {
    this.isEditing = false;
    this.email?.disable();
    this.password?.disable();

    if (this.password?.value?.length! < 8) {
      this.errorService.errorMessage.next("Your password must be at least 8 characters long.");
      this.errorService.showErrorMessage();
      return;
    }
    if (this.email?.value == "" && this.password?.value == "") {
      this.errorService.errorMessage.next("You must enter an email and password.");
      this.errorService.showErrorMessage();
      return;
    }

    this.authenticationService.changeCredentials(this.email?.value!, this.password?.value!).subscribe({
      next: () => {
        this.confirmationService.confirmationMessage.next("Information updated!");
        this.confirmationService.showConfirmationMessage();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService, private errorService: ErrorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

}
