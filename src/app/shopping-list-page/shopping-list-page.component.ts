import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_models/shopping-list-item';
import { ShoppingListItemService } from '../_services/shopping-list-item.service';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.css']
})
export class ShoppingListPageComponent implements OnInit {
  listItems: ShoppingListItem[] = [];
  searchedItems: ShoppingListItem[] = [];
  loading = false;

  getItems() {
    this.loading = true;
    this.shoppingListService.getItems().subscribe({
      next: (items) => {
        this.listItems = items;
        this.loading = false;
        this.sortItems();
      }
    });
  }

  checkItem(item: ShoppingListItem) {
    item.isChecked = !item.isChecked;
    this.shoppingListService.updateItem(item).subscribe();
    this.sortItems();
  }

  deleteItem(item: ShoppingListItem) {
    this.shoppingListService.deleteItem(item).subscribe({
      next: () => {
        this.listItems = this.listItems.filter(i => i.name !== item.name);
      }
    });
  }

  searchItems(term: string) {
    this.searchedItems = this.listItems.filter(item => item.name.toUpperCase().includes(term.toUpperCase()));
  }

  // Returns the shopping list of items where checked items are at the bottom.
  sortItems(): void {
    this.listItems.sort((a, b) => {
      return Number(a.isChecked) - Number(b.isChecked);
    });
  }

  constructor(private shoppingListService: ShoppingListItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

}
