import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  showError: BehaviorSubject<boolean> = new BehaviorSubject(false);
  errorMessage: BehaviorSubject<string> = new BehaviorSubject("");
  private timeoutId: NodeJS.Timeout | undefined;

  showErrorMessage() {
    clearTimeout(this.timeoutId || "");
    this.showError.next(true);
    this.timeoutId = setTimeout(() => this.showError.next(false), 5000);
  }

  constructor() { }
}
