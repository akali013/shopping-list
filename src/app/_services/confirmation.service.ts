import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private showConfirmation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private confirmationMessage: BehaviorSubject<string> = new BehaviorSubject("");
  private timeoutId: NodeJS.Timeout | undefined;
  showConfirmationObservable = this.showConfirmation.asObservable();
  confirmationMessageObservable = this.confirmationMessage.asObservable();

  showConfirmationMessage() {
    clearTimeout(this.timeoutId || "");
    this.showConfirmation.next(true);
    this.timeoutId = setTimeout(() => this.showConfirmation.next(false), 3000);
  }

  sendConfirmationMessage(text: string) {
    this.confirmationMessage.next(text);
  }

  constructor() { }
}
