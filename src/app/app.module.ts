import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { appIntializer } from './_auth/app.initializer';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_auth/jwt.interceptor';
import { ErrorInterceptor } from './_auth/error.interceptor';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

// Angular Material Components
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


// Frontend JWTs provided by: https://jasonwatmore.com/post/2022/12/08/angular-14-jwt-authentication-with-refresh-tokens-example-tutorial

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ShoppingListPageComponent,
    HeaderComponent,
    AddItemsPageComponent,
    SearchBarComponent,
    SettingsPageComponent,
    CreateItemPageComponent,
    SignUpPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appIntializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
