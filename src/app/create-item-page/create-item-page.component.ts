import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from '../_services/items.service';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.css']
})
export class CreateItemPageComponent implements OnInit {
  createItemForm = new FormGroup({
    itemName: new FormControl("", Validators.required)
  });

  showConfirmation: boolean = false;
  showError: boolean = false;
  httpError: string = "";

  submitForm() {
    if (this.createItemForm.invalid) {
      this.showError = true;
      this.httpError = "You must enter a name.";
      setTimeout(() => this.showError = false, 2000);
      return;
    }
    
    this.itemsService.createItem(this.createItemForm.get("itemName")?.value!).subscribe({
      next: () => {
        this.showConfirmation = true;
        setTimeout(() => this.showConfirmation = false, 2000);
      },
      error: (err) => {
        this.showError = true;
        this.httpError = err;
        setTimeout(() => this.showError = false, 2000);
      }
    });
  }

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

}
