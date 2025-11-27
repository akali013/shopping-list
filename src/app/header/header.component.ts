import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../_services/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  darkModeEnabled = false;
  selectedPage = "list";

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  changeActivePage(page: string) {
    this.selectedPage = page;
  }

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.darkModeService.darkModeEnabled.subscribe(modeSetting => this.darkModeEnabled = modeSetting);
  }
}
