import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from '../_services/items.service';
import { ErrorService } from '../_services/error.service';
import { ConfirmationService } from '../_services/confirmation.service';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.css']
})
export class CreateItemPageComponent implements OnInit {
  createItemForm = new FormGroup({
    itemName: new FormControl("", Validators.required)
  });

  submitForm() {
    if (this.createItemForm.invalid) {
      this.errorService.sendErrorMessage("You must enter a name.");
      this.errorService.showErrorMessage();
      return;
    }
    
    this.itemsService.createItem(this.createItemForm.get("itemName")?.value!).subscribe({
      next: () => {
        this.confirmationService.sendConfirmationMessage("Item created!");
        this.confirmationService.showConfirmationMessage();
      }
    });
  }

  constructor(private itemsService: ItemsService, private errorService: ErrorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

}
