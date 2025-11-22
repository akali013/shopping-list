import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  showError: BehaviorSubject<boolean> = new BehaviorSubject(false);
  errorMessage: BehaviorSubject<string> = new BehaviorSubject("");

  showErrorMessage() {
    this.showError.next(true);
    setTimeout(() => this.showError.next(false), 5000);
  }

  constructor() { }
}
