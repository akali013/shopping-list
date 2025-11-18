import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemsService } from "../services/items.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();

  updateSearch(searchTerm: string): void {
    this.searchEvent.emit(searchTerm);
  }

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

}
