import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from '../_services/error.service';
import { ConfirmationService } from '../_services/confirmation.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css', './sign-up-page.component-mobile.css']
})
export class SignUpPageComponent implements OnInit {
  signUpForm = new FormGroup({
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
    "retypePassword": new FormControl("", Validators.required)
  });

  get email() {
    return this.signUpForm.get("email");
  }
  get password() {
    return this.signUpForm.get("password");
  }
  get retypePassword() {
    return this.signUpForm.get("retypePassword");
  }

  returnToLogin(): void {
    this.router.navigate(["/login"]);
  }

  createAccount(): void {
    if (this.email?.value! == "" || this.password?.value == "") {
      this.errorService.errorMessage.next("You must enter an email and password.");
      this.errorService.showErrorMessage();
      return;
    };

    if (this.password?.value !== this.retypePassword?.value) {
      this.errorService.errorMessage.next("Your passwords must match.");
      this.errorService.showErrorMessage();
      return;
    }

    this.authenticationService.createAccount(this.email?.value!, this.password?.value!).subscribe({
      next: async () => {
        this.confirmationService.confirmationMessage.next("Account created!");
        this.confirmationService.showConfirmationMessage();
        this.returnToLogin();
      }
    });
  }


  constructor(private router: Router, private authenticationService: AuthenticationService, private errorService: ErrorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

}
