import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  selectedPage = "";

  changeActivePage(page: string) {
    this.selectedPage = page;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
