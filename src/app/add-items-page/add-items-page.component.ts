import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_models/shopping-list-item';
import { ItemsService } from '../_services/items.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Item } from '../_models/item';
import { ShoppingListItemService } from '../_services/shopping-list-item.service';
import { ConfirmationService } from '../_services/confirmation.service';
import { gridButtonAnimation } from '../animations';

@Component({
  selector: 'app-add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.css', './add-items-page.component-mobile.css'],
  animations: [gridButtonAnimation]
})
export class AddItemsPageComponent implements OnInit {
  listItems: Item[] = [];
  searchedItems: Item[] = [];
  private searchTerms = new Subject<string>();

  addItem(itemName: string) {
    this.shoppingListService.addItem(itemName).subscribe({
      next: () => {
        this.confirmationService.confirmationMessage.next("Added!");
        this.confirmationService.showConfirmationMessage();
      }
    });
  }

  getItems() {
    this.itemsService.getItems().subscribe(items => this.listItems = items);
  }

  onSearch(searchTerm: string) {
    this.searchTerms.next(searchTerm);
  }

  constructor(private itemsService: ItemsService, private shoppingListService: ShoppingListItemService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getItems();

    this.searchTerms.pipe(
      debounceTime(300),    // Wait until 300ms for the next search
      distinctUntilChanged(),   // Only accept different terms
      switchMap((term: string) => this.itemsService.searchItems(term)),    // Pass new term into search API
    ).subscribe(items => this.searchedItems = items);
  }

}