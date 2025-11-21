import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  showError = false;
  errorMessage = "";

  showErrorMessage() {
    this.showError = true;
    setTimeout(() => this.showError = false, 2000);
  }

  constructor() { }
}
