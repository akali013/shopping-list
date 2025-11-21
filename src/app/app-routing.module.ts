import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingListPageComponent } from './shopping-list-page/shopping-list-page.component';
import { AddItemsPageComponent } from './add-items-page/add-items-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CreateItemPageComponent } from './create-item-page/create-item-page.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "home", component: ShoppingListPageComponent, canActivate: [AuthGuard]},
  {path: "add", component: AddItemsPageComponent, canActivate: [AuthGuard]},
  {path: "settings", component: SettingsPageComponent, canActivate: [AuthGuard]},
  {path: "create", component: CreateItemPageComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
