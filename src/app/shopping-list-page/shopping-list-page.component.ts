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

  getItems() {
    this.shoppingListService.getItems().subscribe(items => this.listItems = items);
  }

  checkItem(item: ShoppingListItem) {
    item.isChecked = !item.isChecked;
    this.shoppingListService.updateItem(item).subscribe();
  }

  deleteItem(item: ShoppingListItem) {
    this.shoppingListService.deleteItem(item).subscribe({
      next: () => {
        this.listItems = this.listItems.filter(i => i.name !== item.name);
      }
    });
  }

  constructor(private shoppingListService: ShoppingListItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

}
