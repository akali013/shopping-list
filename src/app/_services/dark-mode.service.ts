import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private mode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  darkModeEnabled: Observable<boolean> = this.mode.asObservable();

  toggleDarkMode() {
    this.mode.next(!this.mode.value);
  }

  constructor() { }
}
