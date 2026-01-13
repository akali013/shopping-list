import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_models/shopping-list-item';
import { ShoppingListItemService } from '../_services/shopping-list-item.service';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from '../_services/confirmation.service';
import { ErrorService } from '../_services/error.service';
import { itemAnimation } from '../animations';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.css', './shopping-list-page.component-mobile.css'],
  animations: [itemAnimation]
})
export class ShoppingListPageComponent implements OnInit {
  listItems: ShoppingListItem[] = [];
  searchedItems: ShoppingListItem[] = [];
  loading = false;
  editedItem = "";
  quantityInput = new FormControl(1, Validators.required);

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

  editItemQuantity(item: ShoppingListItem) {
    this.editedItem = item.name;
  }

  updateQuantity(item: ShoppingListItem) {
    if (this.quantityInput.value == null) {
      this.errorService.sendErrorMessage("You must enter a number.");
      this.errorService.showErrorMessage();
      return;
    }
    
    const newItem: ShoppingListItem = { ...item };
    newItem.quantity = this.quantityInput.value!;
      this.shoppingListService.updateItem(newItem).subscribe({
        next: () => {
          this.confirmationService.sendConfirmationMessage("Item updated!");
          this.confirmationService.showConfirmationMessage();
          // Refresh affected item to show updated quantity
          item.quantity = newItem.quantity;
          this.editedItem = "";
        }
      });
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

  constructor(private shoppingListService: ShoppingListItemService, private confirmationService: ConfirmationService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getItems();
  }

}
