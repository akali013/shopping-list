import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_models/shopping-list-item';
import { ItemsService } from '../_services/items.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.css']
})
export class AddItemsPageComponent implements OnInit {
  listItems: ShoppingListItem[] = [];
  searchedItems: ShoppingListItem[] = [];
  private searchTerms = new Subject<string>();
  showConfirmation: boolean = false;

  addItem(item: ShoppingListItem) {
    const userItems: ShoppingListItem[] = JSON.parse(localStorage.getItem("listItems")!);
    userItems.push(item);
    localStorage.setItem("listItems", JSON.stringify(userItems));
    this.showConfirmation = true;
    setTimeout(() => this.showConfirmation = false, 2000);
  }

  getItems() {
    this.itemsService.getItems().subscribe(items => this.listItems = items);
  }

  onSearch(searchTerm: string) {
    this.searchTerms.next(searchTerm);
  }

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();

    this.searchTerms.pipe(
      debounceTime(300),    // Wait until 300ms for the next search
      distinctUntilChanged(),   // Only accept different terms
      switchMap((term: string) => this.itemsService.searchItems(term)),    // Pass new term into search API
    ).subscribe(items => this.searchedItems = items);
  }

}