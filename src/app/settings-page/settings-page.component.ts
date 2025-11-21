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
  showConfirmation = false;

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
    
    this.authenticationService.changeCredentials(this.email?.value!, this.password?.value!).subscribe({
      next: () => {
        this.showConfirmation = true;
        setTimeout(() => this.showConfirmation = false, 3000);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
