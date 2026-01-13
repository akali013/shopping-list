import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private showError: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private errorMessage: BehaviorSubject<string> = new BehaviorSubject("");
  errorMessageObservable = this.errorMessage.asObservable();
  showErrorObservable = this.showError.asObservable();
  private timeoutId: NodeJS.Timeout | undefined;

  showErrorMessage() {
    clearTimeout(this.timeoutId || "");
    this.showError.next(true);
    this.timeoutId = setTimeout(() => this.showError.next(false), 5000);
  }

  sendErrorMessage(text: string) {
    this.errorMessage.next(text);
  }
  
  constructor() { }
}
