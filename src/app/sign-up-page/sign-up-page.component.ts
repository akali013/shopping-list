import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from '../_services/error.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  showConfirmation = false;
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
        console.log("Account created");
        this.showConfirmation = true;
        await setTimeout(() => this.showConfirmation = true, 3000);
        this.returnToLogin();
      }
    });
  }


  constructor(private router: Router, private authenticationService: AuthenticationService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

}
