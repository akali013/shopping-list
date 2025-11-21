import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  isEditing: boolean = false;

  credentialsForm = new FormGroup({
    email: new FormControl({value: "", disabled: !this.isEditing}, Validators.required),
    password: new FormControl({value: "", disabled: !this.isEditing}, Validators.required)
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
    console.log(this.credentialsForm.value);
  }

  logout() {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
