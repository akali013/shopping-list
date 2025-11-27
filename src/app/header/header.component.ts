import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../_services/dark-mode.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header.component-mobile.css']
})
export class HeaderComponent implements OnInit {
  darkModeEnabled = false;
  selectedPage = "list";
  usingMobileDevice = false;

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  changeActivePage(page: string) {
    this.selectedPage = page;
  }

  constructor(private darkModeService: DarkModeService, private userService: UserService) { }

  ngOnInit(): void {
    this.darkModeService.darkModeEnabled.subscribe(modeSetting => this.darkModeEnabled = modeSetting);
    this.usingMobileDevice = this.userService.usingMobileDevice;
  }
}
