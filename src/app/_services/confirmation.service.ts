import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  showConfirmation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  confirmationMessage: BehaviorSubject<string> = new BehaviorSubject("");
  private timeoutId: NodeJS.Timeout | undefined;

  showConfirmationMessage() {
    clearTimeout(this.timeoutId || "");
    this.showConfirmation.next(true);
    this.timeoutId = setTimeout(() => this.showConfirmation.next(false), 3000);
  }

  constructor() { }
}
