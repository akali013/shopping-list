import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_models/shopping-list-item';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.css']
})
export class ShoppingListPageComponent implements OnInit {
  listItems: ShoppingListItem[] = JSON.parse(localStorage.getItem("listItems")!) || []; // Use local storage for now until db integration

  checkItem(item: ShoppingListItem) {
    item.isChecked = !item.isChecked;
  }

  deleteItem(item: ShoppingListItem) {
    this.listItems = this.listItems.filter(i => i.id !== item.id);
    localStorage.setItem("listItems", JSON.stringify(this.listItems));
  }

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("listItems", JSON.stringify(this.listItems));
  }

}
