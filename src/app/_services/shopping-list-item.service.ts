import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingListItem } from '../_models/shopping-list-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListItemService {
  apiUrl = `${environment.apiUrl}/shoppinglistitem`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  getItems(): Observable<ShoppingListItem[]> {
    return this.http.get<ShoppingListItem[]>(this.apiUrl, this.httpOptions).pipe(
      tap(_ => console.log("retrieved items")),
      catchError(this.handleError("getItems", []))
    );
  }

  // Adds the chosen item to the user's shopping list
  // (The user is identified via the cookie's refresh token)
  addItem(itemName: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { "Name": itemName, "Quantity": 1 }, this.httpOptions).pipe(
      tap(item => console.log(`added item: ${item}`)),
      catchError(this.handleError("addItem", ""))
    );
  }

  updateItem(item: ShoppingListItem): Observable<any> {
    return this.http.put<any>(this.apiUrl, {"Name": item.name, "Quantity": item.quantity, "IsChecked": item.isChecked}, this.httpOptions).pipe(
      tap(item => console.log(`updated item: ${item}`)),
      catchError(this.handleError("updateItem", ""))
    );
  }

  deleteItem(item: ShoppingListItem): Observable<any> {
    return this.http.delete(this.apiUrl, {...this.httpOptions, params: {"Name": item.name, "Quantity": item.quantity, "IsChecked": item.isChecked}}).pipe(
      tap(_ => console.log("Deleted item")),
      catchError(this.handleError("deleteItem", ""))
    );
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }

  constructor(private http: HttpClient) { }
}
