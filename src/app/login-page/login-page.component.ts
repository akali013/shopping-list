import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });
  loading = false;
  submitted = false;
  error = "";

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submitCredentials(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;
    
    this.loading = true;
    this.authenticationService.login(this.email?.value!, this.password?.value!).subscribe({
      next: () => {
        // Navigate to the desired route if there is one
        const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
        this.router.navigate([returnUrl]);
      },
      error: err => {
        this.error = err;
        this.loading = false;
      }
    })
  }

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Show the shopping list if the user is already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(["/home"]);
    }
  }

}
