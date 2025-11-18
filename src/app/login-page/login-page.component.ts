import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  submitCredentials(): void {

  }

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
