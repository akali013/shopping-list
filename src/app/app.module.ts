import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingListPageComponent } from './shopping-list-page/shopping-list-page.component';
import { HeaderComponent } from './header/header.component';
import { AddItemsPageComponent } from './add-items-page/add-items-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CreateItemPageComponent } from './create-item-page/create-item-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ShoppingListPageComponent,
    HeaderComponent,
    AddItemsPageComponent,
    SearchBarComponent,
    SettingsPageComponent,
    CreateItemPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
